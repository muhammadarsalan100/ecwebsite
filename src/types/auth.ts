export type AuthView = "LANDING" | "LOGIN" | "REGISTER" | "OTP" | "WELCOME";

export interface AuthLandingProps {
    onSignIn: () => void;
    onCreateAccount: () => void;
    onSkip: () => void;
    onBecomeSeller?: () => void;
}

export interface AuthLoginProps {
    onRegister: () => void;
    onBack: () => void;
    onLogin: (email: string, loginSessionId?: string) => void;
}

export interface LoginSessionData {
    loginSessionId: string;
}

export interface UserData {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    user: {
        fullname: string;
        id: number;
        role: string;
    };
}

export interface RegistrationData {
    email: string;
    id: number;
    code: string;
    token?: string;
    active: boolean;
    createDate: string;
}

export interface ApiResponse<T> {
    data: T;
    totalRecords: number;
    code: string;
    requestId: string;
    message: string;
    // Handle inconsistent backend casing
    Code?: string | number;
    Message?: string;
}

export interface AuthRegisterProps {
    onSignIn: () => void;
    onBack: () => void;
    onSuccess: (email: string, fullName: string, requestCode?: string) => void;
}

export interface AuthOTPProps {
    email: string;
    fullName?: string;
    requestCode?: string;
    loginSessionId?: string;
    onContinue: (otp: string) => void;
    onBack: () => void;
}
export interface AuthWelcomeProps {
    onContinue: () => void;
}

export interface ProfileData {
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    dob: string;
    gender: string;
    phoneNo: string;
    lastLoginAt: string;
    approvedDate: string | null;
    stores: any;
    preferredCountryId: number | null;
    preferredCurrencyId: number | null;
    followersCount: number;
    bankAccount: any;
    business: any;
    identity: any;
    id: number;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string;
}
