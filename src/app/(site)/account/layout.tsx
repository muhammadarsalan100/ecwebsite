"use client";

import { AccountSidebar } from "@/components/layout/AccountSidebar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const PAGE_NAMES: Record<string, string> = {
    "personal-data": "Personal Data",
    "payments": "Payments",
    "orders": "Orders",
    "wish-list": "Wish list",
    "notifications": "Notification",
    "contact-us": "Contact Us",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const lastPart = pathname.split("/").pop() || "";
    const currentPageName = PAGE_NAMES[lastPart] || "Account";

    return (
        <ProtectedRoute>
            <div className="bg-[#F9FAFB] min-h-screen sm:min-h-0">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 sm:py-6">
                    <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                        <Link href="/" className="hover:text-[#0092FF] transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/account/personal-data" className="hover:text-[#0092FF] transition-colors">Account</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-[#0092FF] font-semibold">{currentPageName}</span>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 sm:pb-20 flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Hidden on mobile, sticky on desktop */}
                    <div className="hidden lg:block sticky top-24">
                        <AccountSidebar />
                    </div>

                    {/* Content Panel */}
                    <main className="flex-1 bg-white rounded-[24px] sm:rounded-[40px] shadow-sm border border-gray-100 p-6 md:p-10 min-h-0 sm:min-h-[600px]">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
