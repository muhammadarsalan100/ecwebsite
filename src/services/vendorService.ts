import { api } from "./apiClient";
import { VendorInitRegistrationPayload, VendorInitRegistrationResponse } from "@/types/vendor";

/**
 * Vendor / Seller related API calls.
 */
export const vendorService = {
    /**
     * Step 1: Initiate vendor registration with email.
     * POST /api/v1.0/vendor/registration/init-registration
     * Payload: { data: { email: string } }
     */
    initRegistration: (email: string) =>
        api.post<VendorInitRegistrationResponse>(
            "/api/v1.0/vendor/registration/init-registration",
            { data: { email } } satisfies VendorInitRegistrationPayload
        ),

    /**
     * Step 2: Request OTP with all form data and documents.
     * POST /api/v1.0/vendor/registration/request-otp
     */
    requestOTP: (formData: FormData) =>
        api.post("/api/v1.0/vendor/registration/request-otp", formData),

    /**
     * Step 3: Verify OTP.
     * POST /api/v1.0/vendor/registration/verify-otp
     */
    verifyOTP: (requestCode: string, otp: string) =>
        api.post("/api/v1.0/vendor/registration/verify-otp", {
            data: { requestCode, otp },
        }),
};
