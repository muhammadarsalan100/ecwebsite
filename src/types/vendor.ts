// ─── Vendor Registration Types ────────────────────────────────────────────────

export interface VendorInitRegistrationPayload {
    data: {
        email: string;
    };
}

export interface VendorInitRegistrationResponse {
    data: {
        code: string;   // registration token returned by the API
    };
    code: string;       // e.g. "OK"
    message: string;    // e.g. "Initiated"
}

// ─── Vendor Auth View States ──────────────────────────────────────────────────

export type VendorAuthView = "LANDING" | "OTP" | "WELCOME";

// ─── Component Props ──────────────────────────────────────────────────────────

export interface VendorAuthLandingProps {
    onContinue: (email: string) => void;
    onBack: () => void;
}

export interface VendorAuthOTPProps {
    email: string;
    onContinue: () => void;
    onBack: () => void;
}

export interface VendorRegistrationRequest {
    email: string;
    fullName: string;
    phoneNo: string;
    bankAccount: {
        accountHolderName: string;
        accountTitle: string;
        accountNumber: string;
        bankName: string;
        branchCode: string;
        iban: string;
    };
    business: {
        countryId: number | string;
        stateId: number | string;
        cityId: number | string;
        addressLine1: string;
        addressLine2?: string;
        zipCode: string;
    };
    identity: {
        passportNumber: string;
        passportIssueDate: string;
        passportExpiryDate: string;
        nationalIdNumber: string;
        nationalIdIssueDate: string;
        nationalIdExpiryDate: string;
    };
}

export interface VendorRegistrationResponse {
    data?: {
        code: string;
        email: string;
        [key: string]: any;
    };
    code?: string;
    message?: string;
    errors?: Record<string, string[]>;
    title?: string;
    status?: number;
}
