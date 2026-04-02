import { STORAGE_KEYS, API_ROUTES } from "@/constants";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
}

export interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
    token?: string;
}

/**
 * Extracts a human-readable error message from API response data.
 */
function extractErrorMessage(data: any, status: number): string {
    // Priority: Message (exact match), message, detail, title, then other common keys
    let message = data.Message || data.message || data.detail || data.title || data.Error || data.error || data.reason || data.description || data.error_description;

    if (!message && data.errors) {
        // Handle ASP.NET Core style validation errors or other structured errors
        const errorValues = Object.values(data.errors);
        if (errorValues.length > 0) {
            message = errorValues.flat().join(", ");
        }
    }

    return message || `API Error: ${status}`;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, token, ...rest } = options;

    const queryString = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";

    const url = `${BASE_URL}${endpoint}${queryString}`;

    const authHeaders: Record<string, string> = {};

    let authToken = token;
    let isGuest = true;
    let staticGuestToken = "";

    // Automatically resolve authentication state
    if (typeof window !== "undefined") {
        if (!authToken) {
            authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || undefined;
        }

        const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
        const userDataStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        let hasUserEmail = !!userEmail;
        if (!hasUserEmail && userDataStr) {
            try {
                const ud = JSON.parse(userDataStr);
                if (ud.email || ud.user?.email) hasUserEmail = true;
            } catch { }
        }

        isGuest = !hasUserEmail;
        staticGuestToken = process.env.NEXT_PUBLIC_GUEST_TOKEN || "";
    }

    if (authToken) {
        authHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    // Always send the static guest token key for guest requests
    if (isGuest && staticGuestToken) {
        authHeaders["x-guest-token"] = staticGuestToken;
    }

    const config: RequestInit = {
        ...rest,
        headers: {
            ...(rest.body && !(rest.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
            ...authHeaders,
            ...headers,
        },
    };

    try {
        let response = await fetch(url, config);

        // Handle 401 Unauthorized or transient server errors (500, 502, 503, 504)
        // Some servers return 500 when a token is malformed/stale instead of 401.
        const isAuthError = response.status === 401;
        const isServerError = [500, 502, 503, 504].includes(response.status);

        if ((isAuthError || isServerError) && typeof window !== 'undefined') {
            // Bug fix: fall back to reading email from user_data if user_email key is absent
            const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || (function () {
                try {
                    const ud = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA) || "");
                    return ud?.email || ud?.user?.email || null;
                } catch { return null; }
            })();

            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

            if (userEmail && refreshToken) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        const refreshResponse = await fetch(`${BASE_URL}${API_ROUTES.REFRESH_TOKEN}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                data: {
                                    username: userEmail,
                                    refreshToken: refreshToken
                                }
                            })
                        });

                        if (refreshResponse.ok) {
                            const refreshData = await refreshResponse.json();
                            const newToken = refreshData.data?.accessToken;
                            const newRefreshToken = refreshData.data?.refreshToken;
                            const newIdToken = refreshData.data?.idToken;

                            if (newToken) {
                                localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
                                if (newRefreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
                                if (newIdToken) localStorage.setItem(STORAGE_KEYS.ID_TOKEN, newIdToken);

                                // Update user_data in localStorage if it exists
                                const userDataStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);
                                if (userDataStr) {
                                    try {
                                        const userData = JSON.parse(userDataStr);
                                        userData.accessToken = newToken;
                                        if (newRefreshToken) userData.refreshToken = newRefreshToken;
                                        if (newIdToken) userData.idToken = newIdToken;
                                        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
                                    } catch (e) { }
                                }

                                onRefreshed(newToken);
                                isRefreshing = false;

                                // Retry original request with new token
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
                                if (newConfig.headers) delete (newConfig.headers as any)["x-guest-token"];
                                response = await fetch(url, newConfig);
                            } else {
                                throw new Error("No token in refresh response");
                            }
                        } else {
                            throw new Error("Refresh failed");
                        }
                    } catch (error) {
                        console.error("[AUTH] Global refresh failure:", error);
                        isRefreshing = false;
                        // Hard logout and forcefully become guest
                        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
                        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
                        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                        localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
                        localStorage.removeItem(STORAGE_KEYS.ID_TOKEN);

                        // Send user to homepage where guest session will be acquired
                        window.location.href = "/";

                        // Return hanging promise so we don't throw React errors while navigating
                        return new Promise(() => { });
                    }
                } else {
                    // Already refreshing, wait for it to finish then retry
                    return new Promise((resolve, reject) => {
                        subscribeTokenRefresh(async (newToken) => {
                            try {
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
                                if (newConfig.headers) delete (newConfig.headers as any)["x-guest-token"];
                                const retryResponse = await fetch(url, newConfig);
                                if (retryResponse.status === 401) {
                                    window.location.href = "/auth";
                                    reject(new Error("Unauthorized after refresh"));
                                    return;
                                }
                                const data = await retryResponse.json().catch(() => ({}));
                                if (retryResponse.ok) {
                                    resolve(data as T);
                                } else {
                                    reject(new Error(`${extractErrorMessage(data, retryResponse.status)} (${endpoint})`));
                                }
                            } catch (e) {
                                reject(e);
                            }
                        });
                    });
                }
            } else {
                // Guest Session handling: If guest token is expired, just get a new guest session
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        const guestResponse = await fetch(`${BASE_URL}/api/v1.0/account/login/guest-session`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-guest-token': process.env.NEXT_PUBLIC_GUEST_TOKEN || ""
                            },
                            body: JSON.stringify({})
                        });

                        if (guestResponse.ok) {
                            const guestData = await guestResponse.json();
                            const newToken = guestData.data?.accessToken;
                            const newIdToken = guestData.data?.idToken;

                            if (newToken) {
                                localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
                                if (newIdToken) localStorage.setItem(STORAGE_KEYS.ID_TOKEN, newIdToken);

                                // Update user_data for hydration consistency
                                const userDataStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);
                                if (userDataStr) {
                                    try {
                                        const userData = JSON.parse(userDataStr);
                                        userData.accessToken = newToken;
                                        if (newIdToken) userData.idToken = newIdToken;
                                        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
                                    } catch (e) { }
                                }

                                onRefreshed(newToken);
                                isRefreshing = false;

                                // Retry original request
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
                                // FIX: Don't delete x-guest-token for guests as it might be required!
                                // if (newConfig.headers) delete (newConfig.headers as any)["x-guest-token"];
                                response = await fetch(url, newConfig);
                            } else {
                                throw new Error("Invalid guest session response");
                            }
                        } else {
                            throw new Error("Guest re-auth failed");
                        }
                    } catch (error) {
                        console.error("[AUTH] Guest re-auth failure:", error);
                        isRefreshing = false;
                        // If guest re-auth fails, we throw the error so the app knows it can't proceed
                        throw error;
                    }
                } else {
                    // Already refreshing guest (or user) token, wait in queue
                    return new Promise((resolve, reject) => {
                        subscribeTokenRefresh(async (newToken) => {
                            try {
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
                                if (newConfig.headers) delete (newConfig.headers as any)["x-guest-token"];
                                const retryResponse = await fetch(url, newConfig);
                                if (retryResponse.status === 401) {
                                    reject(new Error("Unauthorized after guest session reset"));
                                    return;
                                }
                                const data = await retryResponse.json().catch(() => ({}));
                                if (retryResponse.ok) {
                                    resolve(data as T);
                                } else {
                                    reject(new Error(`${extractErrorMessage(data, retryResponse.status)} (${endpoint})`));
                                }
                            } catch (e) {
                                reject(e);
                            }
                        });
                    });
                }
            }
        }

        const data = await response.json().catch(() => ({}));
        const authHeader = response.headers.get("Authorization") ||
            response.headers.get("secure-token") ||
            response.headers.get("x-secure-token");

        if (!response.ok) {
            throw new Error(`${extractErrorMessage(data, response.status)} (${endpoint})`);
        }

        // Return data. Only attach _authToken if data is a non-array object.
        if (data && typeof data === "object" && !Array.isArray(data)) {
            return { ...data, _authToken: authHeader } as T;
        }

        return data as T;
    } catch (error) {
        console.error(`[API ERROR] ${options.method || "GET"} ${endpoint}:`, error);
        throw error;
    }
}

export const api = {
    get: <T>(url: string, options?: RequestOptions) =>
        request<T>(url, { ...options, method: "GET" }),

    post: <T>(url: string, body: any, options?: RequestOptions) => {
        const isFormData = body instanceof FormData;
        const config: RequestOptions = {
            ...options,
            method: "POST",
            body: isFormData ? body : JSON.stringify(body),
        };
        if (isFormData) {
            config.headers = { ...options?.headers };
            delete (config.headers as any)["Content-Type"];
        }
        return request<T>(url, config);
    },

    put: <T>(url: string, body: any, options?: RequestOptions) => {
        const isFormData = body instanceof FormData;
        const config: RequestOptions = {
            ...options,
            method: "PUT",
            body: isFormData ? body : JSON.stringify(body),
        };
        if (isFormData) {
            config.headers = { ...options?.headers };
            delete (config.headers as any)["Content-Type"];
        }
        return request<T>(url, config);
    },

    delete: <T>(url: string, options?: RequestOptions) =>
        request<T>(url, { ...options, method: "DELETE" }),

    patch: <T>(url: string, body: any, options?: RequestOptions) => {
        const isFormData = body instanceof FormData;
        const config: RequestOptions = {
            ...options,
            method: "PATCH",
            body: isFormData ? body : JSON.stringify(body),
        };
        if (isFormData) {
            config.headers = { ...options?.headers };
            delete (config.headers as any)["Content-Type"];
        }
        return request<T>(url, config);
    },
};
