/**
 * Application-wide constants.
 * Centralizes magic strings and configuration values used across the codebase.
 */

// ─── LocalStorage Keys ────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
    USER_DATA: "user_data",
    AUTH_TOKEN: "auth_token",
    ID_TOKEN: "id_token",
    REFRESH_TOKEN: "refresh_token",
    USER_EMAIL: "user_email",
    CART: "cart-storage",
    CONFIG: "config-storage",
} as const;

// ─── API Route Prefixes ───────────────────────────────────────────────────────

export const API_ROUTES = {
    // Auth
    REQUEST_OTP: "/api/v1.0/registration/request-otp",
    VERIFY_OTP: "/api/v1.0/registration/verify-otp",
    CREATE_ACCOUNT: "/api/v1.0/account",
    LOGIN_INITIATE: "/api/v1.0/account/login/initiate",
    LOGIN_CONFIRM: "/api/v1.0/account/login/confirm",
    LOGIN_GUEST: "/api/v1.0/account/login/guest-session",
    REFRESH_TOKEN: "/api/v1.0/account/refresh-token",
    ACCOUNT: "/api/v1.0/account",
    UPDATE_BASE_PROFILE: "/api/v1.0/user/update-base-profile",
    CART: "/api/v1.0/cart",
    CART_ITEMS: "/api/v1.0/cart/items",

    // Config
    COUNTRIES: "/api/v1.0/country",
    STATES: "/api/v1.0/state",
    CITIES: "/api/v1.0/city",
    PAYMENT_MODES: "/api/v1.0/payment-mode",

    // Catalog
    CATALOG_CATEGORY: "/api/v1.0/catalog/category",
    CATALOG_ITEM: "/api/v1.0/catalog/item",
    CATALOG_ITEM_SEARCH: "/api/v1.0/catalog/item/search",

    // User
    WISHLIST: "/api/v1.0/user/customer/wishlist",
    TOP_VENDORS: "/api/v1.0/user/vendor/top-vendors",

    // Vendor
    VENDOR_INIT: "/api/v1.0/vendor/registration/init-registration",
    VENDOR_REQUEST_OTP: "/api/v1.0/vendor/registration/request-otp",
    VENDOR_VERIFY_OTP: "/api/v1.0/vendor/registration/verify-otp",
} as const;

// ─── App Configuration ────────────────────────────────────────────────────────

export const APP_CONFIG = {
    DEFAULT_COUNTRY: "UAE",
    DEFAULT_CURRENCY: "AED",
    DEFAULT_LANGUAGE: "English",
} as const;

// ─── User Roles ───────────────────────────────────────────────────────────────

export const USER_ROLES = {
    GUEST: "PlatformGuests",
    CUSTOMER: "PlatformCustomers",
    VENDOR: "PlatformVendors",
    ADMIN: "PlatformAdmins",
} as const;
