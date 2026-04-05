"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Check, Smartphone, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TopUpDetailsForm } from "@/components/wallet/TopUpDetailsForm";
import { CardData, TopUpPurpose } from "@/types";

// Constants
const CARDS: CardData[] = [
    {
        id: 1,
        type: "Debit Card",
        balance: "$450.73",
        avg: "AVG",
        selected: true,
    },
    {
        id: 2,
        type: "Debit Card",
        balance: "$450.73",
        avg: "AVG",
        selected: false,
    },
    {
        id: 3,
        type: "Debit Card",
        balance: "$450.73",
        avg: "AVG",
        selected: false,
    },
];

const QUICK_AMOUNTS = ["1000", "900", "800", "700", "600", "800", "700", "600"];
const EXCHANGE_RATE = 300 / 450.73; // Mock conversion rate

const PURPOSES = [
    { id: 'mobile_money', label: 'Mobile Money', icon: Smartphone, color: '#0092FF' },
    { id: 'bank_account', label: 'Bank Account', icon: Landmark, color: '#FF8A00' },
] as const;

export default function TopUpRequestPage() {
    // State Hooks
    const [selectedAmount, setSelectedAmount] = useState("450.73");
    const [selectedPurpose, setSelectedPurpose] = useState<TopUpPurpose | "">("");
    const [showDetails, setShowDetails] = useState(false);

    // Derived State
    const convertedAmount = useMemo(() => {
        const amount = parseFloat(selectedAmount) || 0;
        return (amount * EXCHANGE_RATE).toFixed(1);
    }, [selectedAmount]);

    return (
        <div className="space-y-8 pb-2 font-poppins">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">My Wallet</h1>
                <p className="text-muted-foreground mt-1 text-sm">Track, return or purchase items</p>
            </div>

            {!showDetails ? (
                <>
                    {/* Cards Slider */}
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {CARDS.map((card, index) => (
                            <div
                                key={card.id}
                                className={`min-w-[280px] h-[160px] rounded-3xl p-6 text-white relative flex flex-col justify-between shrink-0 overflow-hidden shadow-sm ${index === 0 ? "bg-gradient-to-br from-[#40302B] to-[#2A1F1B]" :
                                    index === 1 ? "bg-gradient-to-br from-[#4A5568] to-[#2D3748]" :
                                        "bg-gradient-to-br from-[#0092FF] to-[#0070C6]"
                                    }`}
                            >
                                {/* Decorative elements for cards */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <span className="text-sm font-bold opacity-80">{card.type}</span>
                                    {card.selected && (
                                        <div className="bg-white/20 p-1.5 rounded-full shadow-sm">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10 flex items-end justify-between">
                                    <div>
                                        <p className="text-[10px] opacity-60 mb-1 font-medium tracking-wide">Available Balance</p>
                                        <p className="text-3xl font-bold tracking-tight">{card.balance}</p>
                                    </div>
                                    <span className="text-[11px] font-bold opacity-40 uppercase tracking-widest">{card.avg}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Amount & Quick Amount Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 pt-4">
                        {/* Enter Amount */}
                        <div className="space-y-4">
                            <label htmlFor="amount-input" className="text-base font-bold text-foreground">Enter the Amount</label>
                            <div className="relative">
                                <Input
                                    id="amount-input"
                                    type="text"
                                    value={selectedAmount}
                                    onChange={(e) => setSelectedAmount(e.target.value)}
                                    className="h-16 pl-6 pr-24 text-lg font-bold border-gray-100 rounded-2xl shadow-sm focus-visible:ring-primary bg-white"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l border-gray-100 pl-4">
                                    <span className="font-bold text-sm text-gray-800">USD</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-gray-400 text-xs font-medium mb-1">Your balance will be</p>
                                <p className="text-[32px] font-bold text-gray-900 tracking-tight leading-none">
                                    {convertedAmount} <span className="text-[24px]">AFH</span>
                                </p>
                            </div>
                        </div>

                        {/* Pick Quick Amount */}
                        <div className="space-y-4">
                            <label className="text-base font-bold text-foreground">Pick a Quick Amount</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {QUICK_AMOUNTS.map((amount, idx) => (
                                    <button
                                        key={`${amount}-${idx}`}
                                        onClick={() => setSelectedAmount(amount)}
                                        className="h-11 rounded-xl border border-gray-100 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-[#0092FF] transition-all bg-white shadow-sm active:scale-95"
                                    >
                                        {amount}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Purpose Section */}
                    <div className="space-y-6 pt-6">
                        <label className="text-base font-bold text-foreground block ">Select Purpose</label>
                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mt-5">
                            {PURPOSES.map((option) => (
                                <label key={option.id} className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105" style={{ backgroundColor: option.color }}>
                                            <option.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-gray-900 group-hover:text-[#0092FF] transition-colors">{option.label}</span>
                                    </div>
                                    <div className="relative flex items-center justify-center ml-4">
                                        <input
                                            type="radio"
                                            name="purpose"
                                            value={option.id}
                                            checked={selectedPurpose === option.id}
                                            onChange={() => setSelectedPurpose(option.id as TopUpPurpose)}
                                            className="appearance-none w-6 h-6 rounded-full border-2 border-gray-200 checked:border-[#0092FF] cursor-pointer transition-all bg-white shadow-sm"
                                        />
                                        <div className={`absolute w-3 h-3 bg-[#0092FF] rounded-full transition-transform duration-200 pointer-events-none ${selectedPurpose === option.id ? 'scale-100' : 'scale-0'}`} />
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="pt-8 flex justify-center">
                        <Button
                            onClick={() => selectedPurpose && setShowDetails(true)}
                            disabled={!selectedPurpose}
                            className="w-full md:w-[280px] h-14 bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold rounded-2xl text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                <TopUpDetailsForm
                    topUpType={selectedPurpose}
                    amount={selectedAmount}
                    onEdit={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}
