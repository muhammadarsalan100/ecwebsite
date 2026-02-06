"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
interface AuthContextType {
    user: string | null;
    login: (email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State Hooks
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Custom Hooks
    const router = useRouter();

    // Effect Hooks
    useEffect(() => {
        const savedUser = localStorage.getItem("user_email");
        if (savedUser) {
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    // Handlers
    const login = (email: string) => {
        setUser(email);
        localStorage.setItem("user_email", email);
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user_email");
        router.push("/auth");
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
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
