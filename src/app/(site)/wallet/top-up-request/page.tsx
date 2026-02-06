"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Check, User, Building, MapPin } from "lucide-react";
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

const QUICK_AMOUNTS = ["1000", "900", "800", "700", "600", "500", "400", "300"];
const EXCHANGE_RATE = 300 / 450.73; // Mock conversion rate

const PURPOSES = [
    { id: 'agent', label: 'Pick up by Agent', icon: User, color: '#0092FF' },
    { id: 'branch', label: 'Nearest Branch', icon: Building, color: '#FF8A00' },
    { id: 'go_agent', label: 'Go to Agent', icon: MapPin, color: '#00DDA2' },
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
        <div className="space-y-8 pb-10 text-poppins">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">My Wallet</h1>
                <p className="text-muted-foreground mt-1">Track, return or purchase items</p>
            </div>

            {!showDetails ? (
                <>
                    {/* Cards Slider */}
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {CARDS.map((card, index) => (
                            <div
                                key={card.id}
                                className="min-w-[280px] h-[160px] rounded-2xl p-6 text-white relative flex flex-col justify-between shrink-0 overflow-hidden"
                            >
                                <Image
                                    src={`/Layer${index + 1}.png`}
                                    alt={`${card.type} background`}
                                    fill
                                    className="object-cover z-0"
                                    unoptimized
                                />

                                <div className="relative z-10 flex justify-between items-start">
                                    <span className="font-medium opacity-90">{card.type}</span>
                                    {card.selected && (
                                        <div className="bg-white/20 p-1 rounded-full">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10 flex items-end justify-between">
                                    <div>
                                        <p className="text-xs opacity-70 mb-1">Available Balance</p>
                                        <p className="text-3xl font-bold">{card.balance}</p>
                                    </div>
                                    <span className="text-xs font-bold opacity-70">{card.avg}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Amount Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left: Enter Amount */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="amount-input" className="text-base font-bold text-foreground">Enter the Amount</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-foreground">$</div>
                                    <Input
                                        id="amount-input"
                                        type="text"
                                        value={selectedAmount}
                                        onChange={(e) => setSelectedAmount(e.target.value)}
                                        className="pl-8 pr-20 py-6 text-lg font-bold border-gray-200 rounded-xl"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l border-border pl-4">
                                        <span className="font-bold text-foreground">USD</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-500 text-sm">Your balance will be</p>
                                <p className="text-3xl font-bold text-foreground">
                                    {convertedAmount} AFH
                                </p>
                            </div>
                        </div>

                        {/* Right: Pick Quick Amount */}
                        <div className="space-y-4">
                            <label className="text-base font-bold text-foreground">Pick a Quick Amount</label>
                            <div className="flex flex-wrap gap-3">
                                {QUICK_AMOUNTS.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setSelectedAmount(amount)}
                                        className="px-6 py-2 rounded-full border border-border text-sm font-bold text-foreground hover:bg-accent hover:border-primary hover:text-primary transition-colors bg-card min-w-[80px]"
                                    >
                                        {amount}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-base font-bold text-foreground">Select Purpose</label>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-20">
                            {PURPOSES.map((option) => (
                                <label key={option.id} className="flex items-center gap-4 cursor-pointer group">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm shrink-0" style={{ backgroundColor: option.color }}>
                                        <option.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold text-sm text-foreground min-w-max">{option.label}</span>
                                    <div className="relative flex items-center justify-center ml-auto sm:ml-2">
                                        <input
                                            type="radio"
                                            name="purpose"
                                            value={option.id}
                                            checked={selectedPurpose === option.id}
                                            onChange={() => setSelectedPurpose(option.id as TopUpPurpose)}
                                            className="appearance-none w-6 h-6 rounded-full border-2 border-border checked:border-[#0092FF] cursor-pointer transition-all bg-card"
                                        />
                                        <div className={`absolute w-3 h-3 bg-[#0092FF] rounded-full transition-transform duration-200 ${selectedPurpose === option.id ? 'scale-100' : 'scale-0'}`} />
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="pt-10 flex justify-center">
                        <Button
                            onClick={() => selectedPurpose && setShowDetails(true)}
                            disabled={!selectedPurpose}
                            className="w-full md:w-[260px] bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold py-7 rounded-2xl text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
