"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { ProfileData } from "@/types/auth";
import { useConfigStore } from "@/lib/store/configStore";
import { useCartStore } from "@/lib/store/cartStore";

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
    const [user, setUser] = useLocalStorage<User | null>("user_data", null);
    const [isLoading, setIsLoading] = useState(true);

    // Custom Hooks
    const router = useRouter();

    // Effect Hooks
    useEffect(() => {
        const initializeAuth = async () => {
            if (typeof window === "undefined") return;

            // If we have an existing user (already logged in), we trigger a background refresh to ensure data consistency
            if (user) {
                if (user.role !== "PlatformGuests") {
                    refreshUser().finally(() => {
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
                    if (userData.accessToken) localStorage.setItem("auth_token", userData.accessToken);
                    if (userData.idToken) localStorage.setItem("id_token", userData.idToken);
                    if (userData.refreshToken) localStorage.setItem("refresh_token", userData.refreshToken);
                }
            } catch (error) {
                console.error("Auto guest login failed during initialization:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Handlers
    const refreshUser = async () => {
        try {
            const response = await authService.getAccount();
            if (response && response.data) {
                setUser((prev: User | null) => {
                    if (!prev) return response.data;
                    return { ...prev, ...response.data };
                });
            }
        } catch (error) {
            console.error("Failed to refresh user profile:", error);
        }
    };

    const login = (userData: User, redirectPath: string | false = "/") => {
        setUser(userData);
        if (userData.accessToken) localStorage.setItem("auth_token", userData.accessToken);
        if (userData.idToken) localStorage.setItem("id_token", userData.idToken);
        if (userData.refreshToken) localStorage.setItem("refresh_token", userData.refreshToken);
        if (userData.email) localStorage.setItem("user_email", userData.email);

        // Fetch full profile in the background after login
        refreshUser();

        if (redirectPath !== false) {
            router.push(redirectPath);
        }
    };

    const logout = async () => {
        // Clear auth data
        setUser(null);
        localStorage.removeItem("user_data");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_email");

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
                if (userData.accessToken) localStorage.setItem("auth_token", userData.accessToken);
                if (userData.idToken) localStorage.setItem("id_token", userData.idToken);
                if (userData.refreshToken) localStorage.setItem("refresh_token", userData.refreshToken);

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
            isAuthenticated: !!user && user?.role !== "PlatformGuests",
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
