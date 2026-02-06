"use client";

import Link from "next/link";
import Image from "next/image";

export default function WalletPage() {
    const actionCards = [
        {
            title: "Top Up Request",
            icon: "/Topup.png",
            href: "/wallet/request",
            bg: "bg-blue-50",
            hover: "hover:bg-blue-100",
        },
        {
            title: "Digital Top up",
            icon: "/Digital-Topup.png",
            href: "/wallet/top-up-request",
            bg: "bg-[#FFF6E9]",
            hover: "hover:bg-orange-100",
        },
    ];

    const transactions = [
        { name: "BTC", desc: "Amount 200USD", date: "12/09/2025", type: "up", color: "blue" },
        { name: "BTC", desc: "Amount 200USD", date: "12/09/2025", type: "down", color: "orange" },
        { name: "BTC", desc: "Amount 200USD", date: "12/09/2025", type: "up", color: "blue" },
        { name: "BTC", desc: "Amount 200USD", date: "12/09/2025", type: "down", color: "orange" },
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
                    <div className="text-3xl md:text-4xl font-bold tracking-tight">$ 201,0231</div>
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
                    {transactions.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                                    <Image
                                        src={item.type === 'up' ? "/Double Alt Arrow Up.png" : "/Double Alt Arrow Down.png"}
                                        alt={item.type === 'up' ? "Receive" : "Send"}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">USD</p>
                                <p className="text-sm text-gray-400">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
