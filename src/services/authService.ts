import { api } from "./apiClient";
import { AuthSchema } from "@/schemas/auth.schema";
import { ApiResponse, RegistrationData, LoginSessionData, UserData } from "@/types/auth";
import { API_ROUTES } from "@/constants";

/**
 * Authentication and User related API calls.
 */
export const authService = {
    /**
     * Request OTP for registration
     */
    requestOTP: (email: string) =>
        api.post<ApiResponse<RegistrationData>>(API_ROUTES.REQUEST_OTP, {
            data: {
                email: email
            }
        }),

    /**
     * Verify OTP for registration
     */
    verifyOTP: (requestCode: string, otp: string) =>
        api.post<ApiResponse<RegistrationData>>(API_ROUTES.VERIFY_OTP, {
            data: {
                requestCode,
                otp
            }
        }),

    /**
     * Final step: Create account/confirm registration
     */
    createAccount: (registrationCode: string, email: string, fullName: string) =>
        api.post<ApiResponse<any>>(API_ROUTES.CREATE_ACCOUNT, {
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
        api.post<ApiResponse<LoginSessionData>>(API_ROUTES.LOGIN_INITIATE, {
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
        api.post<ApiResponse<UserData>>(API_ROUTES.LOGIN_CONFIRM, {
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
        api.post<ApiResponse<UserData>>(API_ROUTES.LOGIN_GUEST, {}, {
            headers: {
                "x-guest-token": process.env.NEXT_PUBLIC_GUEST_TOKEN || ""
            }
        }),

    /**
     * Refresh session token
     */
    refreshToken: (email: string, refreshToken: string) =>
        api.post<ApiResponse<UserData>>(API_ROUTES.REFRESH_TOKEN, {
            data: {
                username: email,
                refreshToken
            }
        }),

    /**
     * Get list of countries
     */
    getCountries: () =>
        api.get<ApiResponse<any>>(API_ROUTES.COUNTRIES),

    /**
     * Get list of states for a country
     */
    getStates: (countryId: number | string) =>
        api.get<ApiResponse<any>>(API_ROUTES.STATES, {
            params: {
                countryId: String(countryId)
            }
        }),

    /**
     * Get list of cities for a state
     */
    getCities: (stateId: number | string) =>
        api.get<ApiResponse<any>>(API_ROUTES.CITIES, {
            params: {
                stateId: String(stateId)
            }
        }),

    /**
     * Get list of currencies for a country
     */
    getCountryCurrencies: (countryId: number | string) =>
        api.get<ApiResponse<any>>(`/api/v1.0/country/${countryId}/currencies`),

    /**
     * Get account details
     */
    getAccount: () =>
        api.get<ApiResponse<any>>(API_ROUTES.ACCOUNT),

    /**
     * Update base profile details (Requires Auth)
     */
    updateBaseProfile: (data: any) =>
        api.patch<ApiResponse<any>>(API_ROUTES.UPDATE_BASE_PROFILE, { data }),

    /**
     * Update account (Requires Auth)
     */
    updateProfile: (data: any) =>
        api.put(API_ROUTES.ACCOUNT, { data }),

    /**
     * Get list of payment modes (Requires Auth)
     */
    getPaymentModes: () =>
        api.get<ApiResponse<any>>(API_ROUTES.PAYMENT_MODES),

    /**
     * Get user wishlist (Requires Auth)
     */
    getWishlist: () =>
        api.get<ApiResponse<any>>(API_ROUTES.WISHLIST),

    /**
     * Add item to wishlist (Requires Auth)
     */
    addToWishlist: (id: number | string) =>
        api.post<ApiResponse<any>>(`/api/v1.0/user/customer/wishlist/add/${id}`, { data: {} }),

    /**
     * Remove item from wishlist (Requires Auth)
     */
    removeFromWishlist: (id: number | string) =>
        api.delete<ApiResponse<any>>(`/api/v1.0/user/customer/wishlist/remove/${id}`),

    /**
     * Get top vendors with their top products (works for both auth and guest tokens)
     */
    getTopVendors: () =>
        api.get<ApiResponse<any>>(API_ROUTES.TOP_VENDORS),

    /**
     * Get all vendors (stores)
     */
    getAllVendors: () =>
        api.get<ApiResponse<any>>("/api/v1.0/user/vendor/all-vendors"),

    /**
     * Get store detail by ID
     */
    getStoreDetail: (id: string | number) =>
        api.get<ApiResponse<any>>(`/api/v1.0/store/${id}`),
};
