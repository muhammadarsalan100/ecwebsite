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

export interface VendorTopItem {
    itemId: number;
    itemName: string;
    logo: string | null;
    unitsSold: number;
    totalSale: number;
    listingId: number;
    currentPrice: number;
    categoryId: number;
    categoryName: string;
    currency: string;
}

export interface VendorStore {
    storeId: number;
    storeName: string;
    storeDescription: string | null;
    logo: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    followersCount: number;
    vendorId: number;
    vendorName: string;
    vendorEmail: string;
    hasActiveSubscription: boolean;
    subscriptionPackagePrice: number;
    isFollowed: boolean;
    topItems: VendorTopItem[];
}

export interface VendorListResponse {
    items: VendorStore[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface StoreDetail {
    id: number;
    code: string;
    name: string;
    description: string | null;
    logo: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    address: string | null;
    geolocation: string | null;
    status: string;
    followersCount: number;
    totalSold: number;
    active: boolean;
    vendor: {
        id: number;
        code: string;
        allName: string;
        fullName: string;
        firstName: string;
        lastName: string;
        role: string;
        status: string;
        gender: string;
        active: boolean;
    };
    city: {
        id: number;
        code: string;
        name: string;
        shortCode: string;
        state: {
            id: number;
            code: string;
            name: string;
            shortCode: string;
            country: {
                id: number;
                code: string;
                name: string;
                shortCode: string;
            };
        };
    };
}
