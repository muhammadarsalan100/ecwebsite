"use client";

import { AccountSidebar, sidebarItems } from "@/components/layout/AccountSidebar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { cn } from "@/lib/utils";

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
                    {/* Sidebar - Persistent on desktop, icon bar on mobile */}
                    <div className="hidden lg:block sticky top-24">
                        <AccountSidebar />
                    </div>

                    {/* Mobile Navigation Bar - Horizontal Icons */}
                    <div className="lg:hidden">
                        <div className="bg-[#0092FF] rounded-2xl p-4 flex gap-4 overflow-x-auto scrollbar-hide mb-2 border border-blue-400/20">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex flex-col items-center gap-1.5 min-w-[80px] transition-all",
                                            isActive ? "text-white scale-110" : "text-white/60"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                            isActive ? "bg-white/20 border border-white/20 shadow-sm" : ""
                                        )}>
                                            <Icon className="w-5 h-5 border-none" />
                                        </div>
                                        <span className="text-[10px] font-bold whitespace-nowrap">{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Panel */}
                    <main className="flex-1 bg-white rounded-[24px] sm:rounded-[40px] shadow-sm border border-gray-100 p-5 sm:p-10 min-h-0 sm:min-h-[600px]">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
