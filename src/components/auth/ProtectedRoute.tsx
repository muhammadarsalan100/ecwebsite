"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // Custom Hooks
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Effect Hooks
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, isLoading, router]);

    // UI Returns
    if (isLoading || !isAuthenticated) {
        return (
            <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Verifying access...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
