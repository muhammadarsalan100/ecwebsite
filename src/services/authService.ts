import { api, withAuth } from "./apiClient";
import { AuthSchema } from "@/schemas/auth.schema";
import { ApiResponse, RegistrationData, LoginSessionData, UserData } from "@/types/auth";

/**
 * Authentication and User related API calls.
 */
export const authService = {
    /**
     * Request OTP for registration
     */
    requestOTP: (email: string) =>
        api.post<ApiResponse<RegistrationData>>("/api/v1.0/registration/request-otp", {
            data: {
                email: email
            }
        }),

    /**
     * Verify OTP for registration
     */
    verifyOTP: (requestCode: string, otp: string) =>
        api.post<ApiResponse<RegistrationData>>("/api/v1.0/registration/verify-otp", {
            data: {
                requestCode,
                otp
            }
        }),

    /**
     * Final step: Create account/confirm registration
     */
    createAccount: (registrationCode: string, email: string, fullName: string) =>
        api.post<ApiResponse<any>>("/api/v1.0/account", {
            data: {
                registrationCode,
                email,
                fullName
            }
        }, {
            headers: {
                "x-secure-token": process.env.NEXT_PUBLIC_SECURE_TOKEN || ""
            }
        }),

    /**
     * Initiate Login - Step 1: Request OTP
     */
    initiateLogin: (email: string) =>
        api.post<ApiResponse<LoginSessionData>>("/api/v1.0/account/login/initiate", {
            data: {
                username: email
            }
        }, {
            headers: {
                "x-secure-token": process.env.NEXT_PUBLIC_SECURE_TOKEN || ""
            }
        }),

    /**
     * Verify Login - Step 2: Confirm OTP
     */
    confirmLogin: (email: string, sessionId: string, otp: string) =>
        api.post<ApiResponse<UserData>>("/api/v1.0/account/login/confirm", {
            data: {
                username: email,
                sessionId,
                otp
            }
        }),

    /**
     * Guest session login using the dedicated guest token header
     */
    guestLogin: () =>
        api.post<ApiResponse<UserData>>("/api/v1.0/account/login/guest-session", {}, {
            headers: {
                "x-guest-token": process.env.NEXT_PUBLIC_GUEST_TOKEN || ""
            }
        }),

    /**
     * Refresh session token
     */
    refreshToken: (email: string, refreshToken: string) =>
        api.post<ApiResponse<UserData>>("/api/v1.0/account/refresh-token", {
            data: {
                username: email,
                refreshToken
            }
        }),

    /**
     * Get list of countries
     */
    getCountries: () =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/country"),

    /**
     * Get list of states for a country
     */
    getStates: (countryId: number | string) =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/state", {
            params: {
                countryId: String(countryId)
            }
        }),

    /**
     * Get list of cities for a state
     */
    getCities: (stateId: number | string) =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/city", {
            params: {
                stateId: String(stateId)
            }
        }),

    /**
     * Get list of currencies for a country
     */
    getCountryCurrencies: (countryId: number | string) =>
        withAuth(api.get)<ApiResponse<any>>(`/api/v1.0/country/${countryId}/currencies`),

    /**
     * Get account details
     */
    getAccount: () =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/account"),

    /**
     * Update base profile details (Requires Auth)
     */
    updateBaseProfile: (data: any) =>
        withAuth(api.patch)<ApiResponse<any>>("/api/v1.0/user/update-base-profile", { data }),

    /**
     * Update account (Requires Auth)
     */
    updateProfile: (data: any) =>
        withAuth(api.put)("/api/v1.0/account", { data }),

    /**
     * Get list of payment modes (Requires Auth)
     */
    getPaymentModes: () =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/payment-mode"),

    /**
     * Get user wishlist (Requires Auth)
     */
    getWishlist: () =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/user/customer/wishlist"),

    /**
     * Add item to wishlist (Requires Auth)
     */
    addToWishlist: (id: number | string) =>
        withAuth(api.post)<ApiResponse<any>>(`/api/v1.0/user/customer/wishlist/add/${id}`, { data: {} }),

    /**
     * Remove item from wishlist (Requires Auth)
     */
    removeFromWishlist: (id: number | string) =>
        withAuth(api.delete)<ApiResponse<any>>(`/api/v1.0/user/customer/wishlist/remove/${id}`),
};
