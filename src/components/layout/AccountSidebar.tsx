"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    User,
    CreditCard,
    ShoppingBag,
    Wallet,
    Heart,
    Bell,
    HeadphonesIcon,
    LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const sidebarItems = [
    {
        title: "Personal Data",
        href: "/account/personal-data",
        icon: User,
    },
    {
        title: "Payments",
        href: "/account/payments",
        icon: CreditCard,
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
        href: "/account/wish-list",
        icon: Heart,
    },
    {
        title: "Notification",
        href: "/account/notifications",
        icon: Bell,
    },
    {
        title: "Contact Us",
        href: "/account/contact-us",
        icon: HeadphonesIcon,
    },
];

export function AccountSidebar() {
    // Custom Hooks
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Derived State
    const displayName = mounted && user
        ? (user.fullName || user.fullname || user.name || (user.email ? user.email.split('@')[0] : "User"))
        : "Loading...";

    const initials = mounted && user
        ? (user.fullName || user.fullname || user.name || user.email || "U").charAt(0).toUpperCase()
        : "";

    return (
        <aside className="w-full md:w-[280px] md:min-w-[280px] bg-[#0092FF] text-white rounded-[24px] md:rounded-[32px] flex-shrink-0 md:min-h-[600px] flex flex-col py-6 md:py-8 px-5 md:px-6 shadow-xl shadow-blue-500/10">
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-10">
                <Avatar className="w-20 h-20 border-2 border-white/20 shadow-inner">
                    <AvatarImage
                        src={user?.personImageUrl || user?.imageUrl}
                        alt="Profile"
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-white/10 text-white font-bold text-2xl uppercase">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <h3 className="font-bold text-lg text-white truncate" style={{ fontFamily: "var(--font-poppins)" }}>
                        {displayName}
                    </h3>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5 flex-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "text-white opacity-100"
                                    : "text-white/60 hover:text-white hover:opacity-100"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-white" : "text-white/60 group-hover:text-white"
                            )} />
                            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
                                {item.title}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-10 pt-4 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 px-4 py-3 text-red-200 hover:text-red-100 group w-full transition-all"
                >
                    <LogOut className="w-5 h-5 text-red-300 group-hover:text-red-200" />
                    <span className="text-sm font-bold" style={{ fontFamily: "var(--font-poppins)" }}>Log Out</span>
                </button>
            </div>
        </aside>
    );
}
