"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { ProfileData } from "@/types/auth";
import { useConfigStore } from "@/lib/store/configStore";
import { useCartStore } from "@/lib/store/cartStore";
import { STORAGE_KEYS, USER_ROLES } from "@/constants";

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
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { useLocalStorage } from "@/hooks/useLocalStorage";

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State Hooks
    const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER_DATA, null);
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

    const logout = async () => {
        // Clear auth data
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ID_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);

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
            login,
            logout,
            refreshUser,
            isAuthenticated: !!user && user?.role !== USER_ROLES.GUEST,
            isLoading
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
