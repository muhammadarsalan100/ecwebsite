"use client";

import Link from "next/link";
import Image from "next/image";
import { History as HistoryIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function WalletPage() {
    const { wallet, isLoading, isAuthenticated } = useAuth();

    const actionCards = [
        {
            title: "Digital Top up",
            icon: "/Digital-Topup.png",
            href: "/wallet/top-up-request",
            bg: "bg-[#FFF6E9]",
            hover: "hover:bg-orange-100",
        },
    ];


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">My Wallet</h1>
                <p className="text-gray-500 mt-1">Track, return or purchase items</p>
            </div>

            {/* Main Stats & Actions */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-[2] bg-[#0092FF] rounded-2xl p-6 text-white flex flex-col justify-center gap-1 min-h-[150px] md:min-h-[180px] shadow-lg shadow-blue-200">
                    <div className="flex flex-col items-start gap-1">
                        <Image
                            src="/WalletIcon.png"
                            alt="Wallet"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                            unoptimized
                        />
                        <span className="opacity-90 text-sm font-medium tracking-wide">Wallet Balance</span>
                    </div>
                    {isLoading ? (
                        <div className="w-32 h-10 bg-white/20 animate-pulse rounded-lg mt-2" />
                    ) : (
                        <div className="text-3xl md:text-4xl font-bold tracking-tight">
                            {isAuthenticated && wallet ? `${wallet.currency.shortCode} ${wallet.currentBalance.toLocaleString()}` : "$0.00"}
                        </div>
                    )}
                </div>

                <div className="flex flex-[3] gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {actionCards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.href}
                            className={`flex-1 min-w-[140px] ${card.bg} rounded-2xl p-4 flex flex-col items-center justify-center gap-3 md:gap-4 text-center ${card.hover} transition-colors group`}
                        >
                            <Image
                                src={card.icon}
                                alt={card.title}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                                unoptimized
                            />
                            <span className="font-bold text-gray-800 text-sm">{card.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Transactions List */}
            <div>
                <h3 className="text-lg font-bold text-foreground mb-6">Recent Transaction</h3>
                <div className="space-y-4">
                    {isLoading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-50 animate-pulse rounded-xl border border-gray-100" />
                        ))
                    ) : wallet?.history && wallet.history.length > 0 ? (
                        wallet.history.map((item: any, i: number) => {
                            const isDebit = item.transactionType === 'Debit' || item.type === 'DEBIT';
                            const isCredit = !isDebit; // Includes 'Credit' and 'Refund'
                            const amount = item.sourceAmount || item.amount || 0;
                            const desc = item.description || item.remark || item.name || "Wallet Transaction";
                            const date = item.createDate || item.date;

                            return (
                                <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isCredit ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                                            <Image
                                                src={isCredit ? "/Double Alt Arrow Up.png" : "/Double Alt Arrow Down.png"}
                                                alt={isCredit ? "Receive" : "Send"}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 object-contain"
                                                unoptimized
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 line-clamp-1 max-w-[200px] md:max-w-md">{desc}</h4>
                                            <p className="text-sm text-gray-400">
                                                {amount ? `${wallet.currency.shortCode} ${amount.toLocaleString()}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className={`font-bold ${isCredit ? 'text-blue-500' : 'text-orange-500'}`}>
                                            {isCredit ? '+' : '-'}{wallet.currency.shortCode} {amount.toLocaleString()}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-1">
                                            {date ? new Date(date).toLocaleDateString() : ""}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

                            <div className="relative">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                                        <HistoryIcon className="w-7 h-7 text-[#0092FF] opacity-80" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">No Transactions Yet</h4>
                                <p className="text-sm text-gray-400 max-w-[280px] mx-auto leading-relaxed">
                                    Your wallet is ready! Once you start shopping or topping up, your transaction history will appear here.
                                </p>
                                <div className="mt-8 flex items-center justify-center gap-2">
                                    <div className="h-1 w-8 bg-blue-100 rounded-full" />
                                    <div className="h-1 w-2 bg-blue-200 rounded-full" />
                                    <div className="h-1 w-1 bg-blue-300 rounded-full" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
