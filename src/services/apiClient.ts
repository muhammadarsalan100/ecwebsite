const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
    token?: string;
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
            "Content-Type": "application/json",
            ...authHeaders,
            ...headers,
        },
    };

    console.log(`[API REQUEST] ${options.method || 'GET'} ${url}`, config);

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));
        const authHeader = response.headers.get("Authorization") ||
            response.headers.get("secure-token") ||
            response.headers.get("x-secure-token");

        if (!response.ok) {
            const errorMessage = data.Message || data.message || data.Error || data.error || `API Error: ${response.status}`;
            throw new Error(errorMessage);
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

    post: <T>(url: string, body: any, options?: RequestOptions) =>
        request<T>(url, { ...options, method: "POST", body: JSON.stringify(body) }),

    put: <T>(url: string, body: any, options?: RequestOptions) =>
        request<T>(url, { ...options, method: "PUT", body: JSON.stringify(body) }),

    delete: <T>(url: string, options?: RequestOptions) =>
        request<T>(url, { ...options, method: "DELETE" }),
};

export function withAuth<T extends (...args: any[]) => Promise<any>>(apiMethod: T): T {
    return (async (...args: any[]): Promise<any> => {
        const token = typeof window !== "undefined"
            ? localStorage.getItem("auth_token") || ""
            : "";

        /**
         * Explicitly identify the index for the 'options' object.
         * api.get/delete(url, options?) -> options is index 1
         * api.post/put(url, body, options?) -> options is index 2
         * 
         * We check the arguments count passed to the inner function
         * or derive it from the expected signature.
         */
        const isFullMethod = args.length >= 2 && typeof args[1] === 'object' && !Array.isArray(args[1]);

        // If it's a POST/PUT, the options is at index 2. 
        // If it's a GET/DELETE, it's at index 1.
        // We can determine this by looking at how many arguments the service passed us.
        let targetOptionsIndex = 1;

        // If the 2nd argument exists and is NOT an object (meaning it's the 'body'), 
        // then the 3rd argument (index 2) must be the options.
        if (args.length >= 2 && (typeof args[1] === 'string' || (typeof args[1] === 'object' && args[1]?.data))) {
            targetOptionsIndex = 2;
        }

        // Ensure we don't skip arguments
        while (args.length <= targetOptionsIndex) {
            args.push(undefined);
        }

        const existingOptions = args[targetOptionsIndex] || {};
        args[targetOptionsIndex] = {
            ...existingOptions,
            token,
            headers: {
                ...existingOptions.headers,
                // If it's a guest token, some backends prefer it in a specific header
                ...(token && !localStorage.getItem("user_email") ? { "x-guest-token": localStorage.getItem("auth_token") || "" } : {})
            }
        };

        console.log(`[AUTH WRAPPER] Injecting token into index ${targetOptionsIndex}`, {
            method: args[0],
            hasToken: !!token
        });

        return apiMethod(...args);
    }) as T;
}
