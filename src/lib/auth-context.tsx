"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { ProfileData, WalletData } from "@/types/auth";
export type { WalletData };
import { useConfigStore } from "@/lib/store/configStore";
import { useCartStore } from "@/lib/store/cartStore";
import { STORAGE_KEYS, USER_ROLES } from "@/constants";
import { Address, CreateAddressPayload } from "@/types/address";

// Types
export interface User extends Partial<ProfileData> {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    name?: string; // For backward compatibility
    fullname?: string; // For backward compatibility
}

interface AuthContextType {
    user: User | null;
    login: (userData: User, redirectPath?: string | false) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
    addresses: Address[];
    fetchAddresses: () => Promise<void>;
    addAddress: (payload: CreateAddressPayload) => Promise<void>;
    updateAddress: (address: Address) => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
    wallet: WalletData | null;
    fetchWallet: () => Promise<void>;
    fetchWalletHistory: () => Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { useLocalStorage } from "@/hooks/useLocalStorage";

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State Hooks
    const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER_DATA, null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Custom Hooks
    const router = useRouter();

    // Effect Hooks
    useEffect(() => {
        const initializeAuth = async () => {
            if (typeof window === "undefined") return;

            // If we have an existing user (already logged in), we trigger a background refresh to ensure data consistency
            if (user) {
                if (user.role !== USER_ROLES.GUEST) {
                    refreshUser()
                        .catch((err) => {
                            // refreshUser threw — apiClient already cleared localStorage
                            // and called window.location.href if tokens are fully expired.
                            // Here we just make sure loading is not stuck if the
                            // redirect hasn't fired yet (e.g. network timeout).
                            console.warn("[Auth] initializeAuth: refreshUser failed:", err);
                        })
                        .finally(() => {
                            fetchAddresses();
                            fetchWallet();
                            fetchWalletHistory();
                            setIsLoading(false);
                        });
                } else {
                    setIsLoading(false);
                }
                return;
            }

            // No user, call guest login to ensure category APIs have a token
            try {
                const response = await authService.guestLogin();
                if (response && response.data) {
                    const guestData = response.data;
                    const userData: User = {
                        accessToken: guestData.accessToken,
                        idToken: guestData.idToken,
                        refreshToken: guestData.refreshToken,
                        id: guestData.user.id,
                        fullname: guestData.user.fullname,
                        role: guestData.user.role,
                    };
                    setUser(userData);
                    if (userData.accessToken) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.accessToken);
                    if (userData.idToken) localStorage.setItem(STORAGE_KEYS.ID_TOKEN, userData.idToken);
                    if (userData.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, userData.refreshToken);
                }
            } catch (error) {
                console.error("Auto guest login failed during initialization:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // ─── Cross-tab logout recovery ────────────────────────────────────────────
    //
    // When Tab A logs out, it clears localStorage. The "storage" event in
    // useLocalStorage automatically sets user = null in Tab B. But Tab B now
    // has no guest session in React state. This effect detects that condition
    // and re-establishes a guest session so Tab B can keep browsing publicly.
    //
    // Guard: !isLoading ensures this doesn't race with initializeAuth() on mount.
    useEffect(() => {
        if (isLoading) return;          // Still initializing on this tab — don't interfere
        if (user !== null) return;      // User exists (logged in or guest) — nothing to do

        // user === null after loading: must be cross-tab logout. Get a guest session.
        authService.guestLogin()
            .then((response) => {
                if (response?.data) {
                    const guestData = response.data;
                    const guestUser: User = {
                        accessToken: guestData.accessToken,
                        idToken: guestData.idToken,
                        refreshToken: guestData.refreshToken,
                        id: guestData.user.id,
                        fullname: guestData.user.fullname,
                        role: guestData.user.role,
                    };
                    setUser(guestUser);
                    if (guestUser.accessToken) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, guestUser.accessToken);
                    if (guestUser.idToken) localStorage.setItem(STORAGE_KEYS.ID_TOKEN, guestUser.idToken);
                    if (guestUser.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, guestUser.refreshToken);
                }
            })
            .catch((err) => {
                console.error("[Auth] Cross-tab logout: failed to re-establish guest session:", err);
            });
    }, [user, isLoading]);
    // ─────────────────────────────────────────────────────────────────────────

    // ─── Post-Login Data Sync ───────────────────────────────────────────────
    //
    // Watch for user changes (login/logout/switch) and sync wallet/addresses.
    // Guaranteed to run for both initial load (after initializeAuth) and subsequent logins.
    useEffect(() => {
        if (user && user.role !== USER_ROLES.GUEST) {
            // New user session: Clear old data immediately to prevent flicker/leak
            setAddresses([]);
            setWallet(null);

            // Fetch fresh data for the actual logged-in user
            fetchAddresses();
            fetchWallet();
            fetchWalletHistory();
        } else if (user?.role === USER_ROLES.GUEST) {
            // Explicitly clear when guest
            setAddresses([]);
            setWallet(null);
        }
    }, [user?.id, user?.role]);
    // ─────────────────────────────────────────────────────────────────────────

    // Handlers
    const refreshUser = async () => {
        try {
            const response = await authService.getAccount();
            if (response && response.data) {
                // Re-read tokens from localStorage after getAccount() —
                // apiClient may have silently refreshed the access token during the call
                // and written new values directly to localStorage. Merge them back into
                // React state so user.accessToken is never stale.
                const freshAccessToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || undefined;
                const freshIdToken = localStorage.getItem(STORAGE_KEYS.ID_TOKEN) || undefined;
                const freshRefreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || undefined;

                setUser((prev: User | null) => ({
                    ...(prev ?? {}),
                    ...response.data,
                    ...(freshAccessToken ? { accessToken: freshAccessToken } : {}),
                    ...(freshIdToken ? { idToken: freshIdToken } : {}),
                    ...(freshRefreshToken ? { refreshToken: freshRefreshToken } : {}),
                }));

                // Always persist email to localStorage so the 401 refresh handler
                // can always identify a real user, even if it was absent at login time.
                const profileEmail = response.data?.email;
                if (profileEmail) {
                    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, profileEmail);
                }

                // Fetch addresses for the user
                fetchAddresses();
            }
        } catch (error) {
            // Re-throw so callers (.catch / .finally chains) can react correctly.
            // If both tokens are fully expired, apiClient already cleared localStorage
            // and triggered window.location.href = "/", so nothing else to do here.
            console.error("Failed to refresh user profile:", error);
            throw error;
        }
    };

    const login = (userData: User, redirectPath: string | false = "/") => {
        setUser(userData);
        if (userData.accessToken) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.accessToken);
        if (userData.idToken) localStorage.setItem(STORAGE_KEYS.ID_TOKEN, userData.idToken);
        if (userData.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, userData.refreshToken);
        if (userData.email) localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);

        // Fetch full profile in the background after login.
        // .catch() is required because refreshUser() now re-throws on failure.
        refreshUser().catch((err) =>
            console.warn("[Auth] Background profile refresh failed after login:", err)
        );

        if (redirectPath !== false) {
            router.push(redirectPath);
        }
    };

    const fetchWallet = async () => {
        if (!user || user.role === USER_ROLES.GUEST) return;
        try {
            const response = await authService.getWallet();
            if (response && response.data) {
                // Safely handle cases where data might be an array or an object
                const walletData = Array.isArray(response.data) ? response.data[0] : response.data;
                if (walletData) {
                    setWallet((prev) => ({
                        ...(prev ?? {}),
                        ...walletData,
                        currentBalance: walletData.currentBalance ?? walletData.CurrentBalance ?? (prev?.currentBalance || 0),
                        history: walletData.history ?? prev?.history ?? null
                    }) as WalletData);
                }
            }
        } catch (error) {
            console.error("Failed to fetch wallet:", error);
        }
    };

    const fetchWalletHistory = async () => {
        if (!user || user.role === USER_ROLES.GUEST) return;
        try {
            const response = await authService.getWalletHistory();
            if (response && response.data) {
                // Safely handle cases where data might be an array or an object
                const walletData = Array.isArray(response.data) ? response.data[0] : response.data;
                if (walletData) {
                    setWallet((prev) => ({
                        ...(prev ?? {}),
                        ...walletData,
                        currentBalance: walletData.currentBalance ?? walletData.CurrentBalance ?? (prev?.currentBalance || 0),
                        history: walletData.history ?? prev?.history ?? null
                    }) as WalletData);
                }
            }
        } catch (error) {
            console.error("Failed to fetch wallet history:", error);
        }
    };

    const fetchAddresses = async () => {
        if (!user || user.role === USER_ROLES.GUEST) return;
        try {
            const response = await authService.getAddresses();
            if (response && response.data) {
                setAddresses(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        }
    };

    const addAddress = async (payload: CreateAddressPayload) => {
        try {
            const response = await authService.createAddress(payload);
            if (response && response.data) {
                // Fetch addresses again to get the updated list from server
                await fetchAddresses();
            }
        } catch (error) {
            console.error("Failed to add address:", error);
            throw error;
        }
    };

    const updateAddress = async (address: Address) => {
        try {
            const response = await authService.updateAddress({ data: address });
            if (response && response.data) {
                await fetchAddresses();
            }
        } catch (error) {
            console.error("Failed to update address:", error);
            throw error;
        }
    };

    const logout = async () => {
        // Clear auth data
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ID_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
        setAddresses([]);
        setWallet(null);

        // Clear cart data
        try {
            const { clearCart } = useCartStore.getState();
            clearCart();
        } catch (error) {
            console.error("Failed to clear cart during logout:", error);
        }

        // Clear config data
        try {
            const { resetConfig } = useConfigStore.getState();
            resetConfig();
        } catch (error) {
            console.error("Failed to reset config store during logout:", error);
        }

        // Re-establish guest session after logout
        try {
            const response = await authService.guestLogin();
            if (response && response.data) {
                const guestData = response.data;
                const userData: User = {
                    accessToken: guestData.accessToken,
                    idToken: guestData.idToken,
                    refreshToken: guestData.refreshToken,
                    id: guestData.user.id,
                    fullname: guestData.user.fullname,
                    role: guestData.user.role,
                };
                setUser(userData);
                if (userData.accessToken) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.accessToken);
                if (userData.idToken) localStorage.setItem(STORAGE_KEYS.ID_TOKEN, userData.idToken);
                if (userData.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, userData.refreshToken);

                // Re-fetch config with the new guest token
                const configStore = useConfigStore.getState();
                configStore.fetchCountries();
                configStore.fetchCategories();
            }
        } catch (error) {
            console.error("Failed to re-establish guest session after logout:", error);
        }

        router.push("/auth");
    };

    return (
        <AuthContext.Provider value={{
            user,
            addresses,
            fetchAddresses,
            addAddress,
            updateAddress,
            login,
            logout,
            refreshUser,
            isAuthenticated: !!user && user?.role !== USER_ROLES.GUEST,
            isLoading,
            wallet,
            fetchWallet,
            fetchWalletHistory
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
