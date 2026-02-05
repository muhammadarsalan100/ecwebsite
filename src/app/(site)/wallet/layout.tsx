"use client";

import { AccountSidebar } from "@/components/layout/AccountSidebar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

export default function WalletLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isWalletRoot = pathname === '/wallet';

    // Map of paths to breadcrumb titles
    const breadcrumbMap: Record<string, string> = {
        'top-up-request': 'Top Up Request',
        'top-up': 'Digital Top Up',
        'currency': 'Multi Currency',
        'confirm': 'Top Up Request'
    };

    // Get the last segment
    const lastSegment = pathname.split('/').pop() || '';
    const currentPageTitle = breadcrumbMap[lastSegment];

    return (
        <div className="bg-white min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/account" className="hover:text-[var(--primary)]">Account</Link>
                    <ChevronRight className="w-4 h-4" />

                    <Link href="/wallet" className={cn("hover:text-[var(--primary)]", isWalletRoot && "text-[var(--primary)] font-medium")}>Wallet</Link>
                    <ChevronRight className="w-4 h-4" />

                    {pathname.split('/')
                        .filter(segment => segment && segment !== 'wallet')
                        .map((segment, index, array) => {
                            const title = breadcrumbMap[segment] || segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                            const isLast = index === array.length - 1;
                            const path = `/wallet/${array.slice(0, index + 1).join('/')}`;

                            return (
                                <React.Fragment key={segment}>
                                    {isLast ? (
                                        <span className="text-[var(--primary)] font-medium">{title}</span>
                                    ) : (
                                        <Link href={path} className="hover:text-[var(--primary)]">{title}</Link>
                                    )}
                                    <ChevronRight className="w-4 h-4" />
                                </React.Fragment>
                            );
                        })}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <AccountSidebar />
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
