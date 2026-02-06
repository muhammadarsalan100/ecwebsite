"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    User,
    ShoppingBag,
    Wallet,
    Heart,
    Bell,
    HeadphonesIcon,
    LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

// Constants
const sidebarItems = [
    {
        title: "Personal Data",
        href: "/account/profile",
        icon: User,
    },
    {
        title: "Orders",
        href: "/account/orders",
        icon: ShoppingBag,
    },
    {
        title: "Wallet",
        href: "/wallet",
        icon: Wallet,
    },
    {
        title: "Wish list",
        href: "/account/wishlist",
        icon: Heart,
    },
    {
        title: "Notification",
        href: "/account/notifications",
        icon: Bell,
    },
    {
        title: "Contact Us",
        href: "/contact",
        icon: HeadphonesIcon,
    },
];

export function AccountSidebar() {
    // Custom Hooks
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // Derived State
    const displayName = user ? user.split('@')[0] : "Petter Harry";

    return (
        <aside className="w-full md:w-[280px] md:min-w-[280px] bg-[#0092FF] text-white rounded-2xl flex-shrink-0 h-auto md:h-[650px] flex flex-col justify-between py-6 md:py-8 px-4 shadow-lg text-poppins">
            <div>
                {/* Profile Section */}
                <div className="flex flex-row md:flex-col items-center gap-4 mb-6 md:mb-5 md:text-center">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0">
                        <Image
                            src="/ProfileImg.png"
                            alt="Profile"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg md:text-xl text-white capitalize">{displayName}</h3>
                        <p className="text-white/60 text-xs md:hidden">Manage your account</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 md:gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap",
                                    isActive
                                        ? "bg-white text-[#0092FF] shadow-sm md:bg-white/10 md:text-white"
                                        : "hover:bg-white/5 opacity-80 hover:opacity-100"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout */}
            <div className="pt-4 md:pt-6 mt-4 md:mt-6 border-t border-white/20 hidden md:block">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 px-4 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 w-full rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5 text-red-200" />
                    <span className="text-red-100 font-semibold">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
