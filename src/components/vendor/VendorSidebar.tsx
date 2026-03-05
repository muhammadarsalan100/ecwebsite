"use client";

import { User, Package, ShoppingBag, Settings, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Personal Data", icon: User, step: 1 },
    { label: "Product", icon: Package, step: null },
    { label: "Orders", icon: ShoppingBag, step: null },
    { label: "Promotion Setting", icon: Settings, step: null },
    { label: "Seller Store", icon: Store, step: null },
];

interface VendorSidebarProps {
    email: string;
    currentStep: number;
}

export function VendorSidebar({ email, currentStep }: VendorSidebarProps) {
    // Derive display name from email (before @)
    const displayName = email
        ? email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Seller";

    return (
        <aside className="w-[240px] min-w-[240px] bg-[#0092FF] rounded-2xl flex flex-col py-8 px-5 gap-8 shadow-lg shadow-blue-500/20 self-start">
            {/* Profile */}
            <div className="flex flex-col items-center gap-3 pt-2">
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 text-white/80" />
                </div>
                <p
                    className="text-white font-bold text-base text-center"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    {displayName}
                </p>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.step === 1 && currentStep >= 1;
                    return (
                        <div
                            key={item.label}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                isActive
                                    ? "bg-white/20 text-white"
                                    : "text-white/70 hover:text-white hover:bg-white/10 cursor-default"
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span
                                className="text-sm font-medium"
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
