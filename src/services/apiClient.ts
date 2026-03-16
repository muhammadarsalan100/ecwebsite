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
 * Checks if a JWT token is expired or about to expire.
 */
function isTokenExpired(token: string): boolean {
    if (!token || token === "") return true;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return true;
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        // Expiration check with 30s buffer
        return payload.exp < now + 10;
    } catch (e) {
        return true;
    }
}

/**
 * Extracts a human-readable error message from API response data.
 */
function extractErrorMessage(data: any, status: number): string {
    // Priority: Message (exact match), message, detail, title, then other common keys
    let message = data.Message || data.message || data.detail || data.title || data.Error || data.error;

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

    if (token) {
        authHeaders["Authorization"] = `Bearer ${token}`;
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

        // Handle 401 Unauthorized - Attempt Refresh (User) or Re-auth (Guest)
        if (response.status === 401 && typeof window !== 'undefined') {
            const userEmail = localStorage.getItem("user_email");
            const refreshToken = localStorage.getItem("refresh_token");

            if (userEmail && refreshToken) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        const refreshResponse = await fetch(`${BASE_URL}/api/v1.0/account/refresh-token`, {
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
                                localStorage.setItem("auth_token", newToken);
                                if (newRefreshToken) localStorage.setItem("refresh_token", newRefreshToken);
                                if (newIdToken) localStorage.setItem("id_token", newIdToken);

                                // Update user_data in localStorage if it exists
                                const userDataStr = localStorage.getItem("user_data");
                                if (userDataStr) {
                                    const userData = JSON.parse(userDataStr);
                                    userData.accessToken = newToken;
                                    if (newRefreshToken) userData.refreshToken = newRefreshToken;
                                    if (newIdToken) userData.idToken = newIdToken;
                                    localStorage.setItem("user_data", JSON.stringify(userData));
                                }

                                onRefreshed(newToken);
                                isRefreshing = false;

                                // Retry original request with new token
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
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
                        // Hard logout
                        localStorage.removeItem("user_data");
                        localStorage.removeItem("auth_token");
                        localStorage.removeItem("refresh_token");
                        localStorage.removeItem("user_email");
                        localStorage.removeItem("id_token");
                        window.location.href = "/auth";
                        throw new Error("Session expired. Please log in again.");
                    }
                } else {
                    // Already refreshing, wait for it to finish then retry
                    return new Promise((resolve, reject) => {
                        subscribeTokenRefresh(async (newToken) => {
                            try {
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
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
                                    reject(new Error(extractErrorMessage(data, retryResponse.status)));
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
                                localStorage.setItem("auth_token", newToken);
                                if (newIdToken) localStorage.setItem("id_token", newIdToken);

                                // Update user_data for hydration consistency
                                const userDataStr = localStorage.getItem("user_data");
                                if (userDataStr) {
                                    try {
                                        const userData = JSON.parse(userDataStr);
                                        userData.accessToken = newToken;
                                        if (newIdToken) userData.idToken = newIdToken;
                                        localStorage.setItem("user_data", JSON.stringify(userData));
                                    } catch (e) { }
                                }

                                onRefreshed(newToken);
                                isRefreshing = false;

                                // Retry original request
                                const newConfig = { ...config };
                                (newConfig.headers as any)["Authorization"] = `Bearer ${newToken}`;
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
                                const retryResponse = await fetch(url, newConfig);
                                if (retryResponse.status === 401) {
                                    reject(new Error("Unauthorized after guest session reset"));
                                    return;
                                }
                                const data = await retryResponse.json().catch(() => ({}));
                                if (retryResponse.ok) {
                                    resolve(data as T);
                                } else {
                                    reject(new Error(extractErrorMessage(data, retryResponse.status)));
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
            throw new Error(extractErrorMessage(data, response.status));
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

export function withAuth<T extends (...args: any[]) => Promise<any>>(apiMethod: T): T {
    return (async (...args: any[]): Promise<any> => {
        let token = typeof window !== "undefined"
            ? localStorage.getItem("auth_token") || ""
            : "";

        // Proactive Check: If token is expired, we let it proceed to trigger the standard 
        // 401 handling in 'request' which will execute the appropriate refresh/re-auth logic.
        if (token && typeof window !== "undefined") {
            if (isTokenExpired(token)) {
                // Let the request proceed to trigger the 401 logic in 'request',
                // which will execute the appropriate refresh/re-auth logic.
            }
        }

        const hasBodyAsSecondArg = args.length >= 2 &&
            (typeof args[1] === 'string' || (typeof args[1] === 'object' && args[1] !== null && 'data' in args[1]));

        const userEmail = typeof window !== "undefined" ? localStorage.getItem("user_email") : null;
        const userDataStr = typeof window !== "undefined" ? localStorage.getItem("user_data") : null;

        // A session is only a "guest" if there is NO email stored anywhere.
        let hasUserEmail = !!userEmail;
        if (!hasUserEmail && userDataStr) {
            try {
                const ud = JSON.parse(userDataStr);
                if (ud.email || ud.user?.email) hasUserEmail = true;
            } catch { }
        }

        const isGuest = !hasUserEmail;
        const staticGuestToken = process.env.NEXT_PUBLIC_GUEST_TOKEN || "";

        const targetOptionsIndex = hasBodyAsSecondArg ? 2 : 1;

        while (args.length <= targetOptionsIndex) {
            args.push(undefined);
        }

        const existingOptions = args[targetOptionsIndex] || {};
        args[targetOptionsIndex] = {
            ...existingOptions,
            // Only send Bearer token if we have a real one in localStorage
            token: token || undefined,
            headers: {
                ...existingOptions.headers,
                // Always send the static guest token key for guest requests
                ...(isGuest ? { "x-guest-token": staticGuestToken } : {})
            }
        };

        return apiMethod(...args);
    }) as T;
}
