"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Check, Smartphone, Landmark, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TopUpDetailsForm } from "@/components/wallet/TopUpDetailsForm";
import { TopUpPurpose } from "@/types";
import { authService } from "@/services/authService";

// Constants
const QUICK_AMOUNTS = ["1000", "900", "800", "700", "600", "1500", "2000", "500"];
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
    const [cards, setCards] = useState<any[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [isLoadingCards, setIsLoadingCards] = useState(true);

    // Fetch Cards
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await authService.getSavedCards();
                if (response?.data) {
                    setCards(response.data);
                    if (response.data.length > 0) {
                        setSelectedCardId(response.data[0].id);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            } finally {
                setIsLoadingCards(false);
            }
        };

        fetchCards();
    }, []);

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
                    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-1 px-1">
                        {isLoadingCards ? (
                            <div className="flex gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="min-w-[280px] h-[160px] rounded-3xl bg-gray-100 animate-pulse flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        ) : cards.length > 0 ? (
                            cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    onClick={() => setSelectedCardId(card.id)}
                                    className={`min-w-[280px] h-[168px] rounded-3xl p-6 text-white relative flex flex-col justify-between shrink-0 overflow-hidden cursor-pointer transition-all duration-300 group ${
                                        selectedCardId === card.id 
                                            ? "shadow-xl shadow-blue-500/30 scale-[1.02] ring-2 ring-white/50" 
                                            : "shadow-md hover:shadow-lg hover:translate-y-[-2px] brightness-90 hover:brightness-100"
                                    } ${
                                        index % 3 === 0 ? "bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#1A1A1A]" : // Professional Dark
                                        index % 3 === 1 ? "bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]" : // Aurora Sunset
                                        "bg-gradient-to-br from-[#00c6ff] to-[#0072ff]" // Clean Blue
                                    }`}
                                >
                                    {/* Glassmorphic Overlays */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />
                                    <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[1px] pointer-events-none" />

                                    <div className="relative z-10 flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mb-0.5">Platform Card</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold tracking-tight capitalize">{card.brand}</span>
                                                {card.brand === "visa" ? (
                                                    <div className="italic font-black text-sm opacity-90">VISA</div>
                                                ) : (
                                                    <div className="flex -space-x-2 opacity-90">
                                                        <div className="w-4 h-4 rounded-full bg-red-500/80" />
                                                        <div className="w-4 h-4 rounded-full bg-yellow-500/80" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Metallic Chip */}
                                        <div className="w-9 h-7 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 rounded-md relative overflow-hidden flex items-center justify-center border border-white/20 shadow-inner">
                                            <div className="w-full h-full flex flex-col justify-between p-1 opacity-20">
                                                <div className="h-px w-full bg-black" />
                                                <div className="h-px w-full bg-black" />
                                                <div className="h-px w-full bg-black" />
                                            </div>
                                            <div className="absolute inset-0 flex">
                                                <div className="w-px h-full bg-black/20 mx-auto" />
                                                <div className="w-px h-full bg-black/20 mx-auto" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <p className="text-xl font-bold tracking-[0.25em] font-mono text-shadow-sm">
                                                <span className="opacity-40">••••</span> <span className="opacity-40">••••</span> <span className="opacity-40">••••</span> {card.last4Digits}
                                            </p>
                                        </div>
                                        
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">Card Holder</span>
                                                <span className="text-[11px] font-bold uppercase tracking-wider">M. Arsalan</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {selectedCardId === card.id ? (
                                                    <div className="bg-white text-blue-600 p-1 rounded-full shadow-lg scale-110 animate-in zoom-in duration-300">
                                                        <Check className="w-3 h-3" strokeWidth={4} />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="min-w-full h-[160px] rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                                <p className="text-sm font-medium">No saved cards found</p>
                                <Button variant="outline" size="sm" className="rounded-xl">Add New Card</Button>
                            </div>
                        )}
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
