"use client";

import { useState, useEffect } from "react";
import {
    CreditCard,
    Wallet,
    Banknote,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/services/authService";
import { ApiResponse } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { AddCardModal } from "@/components/account/AddCardModal";
import { cn } from "@/lib/utils";

interface PaymentMode {
    id: number;
    mode: string;
    name: string;
}

export default function PaymentsPage() {
    const [paymentModes, setPaymentModes] = useState<PaymentMode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [selectedModeId, setSelectedModeId] = useState<number | null>(null);
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

    // Cards State
    const [addedCards, setAddedCards] = useState<any[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPaymentModes = async () => {
            try {
                setLoading(true);
                const response = await authService.getPaymentModes();
                if (response.code === "OK" && Array.isArray(response.data)) {
                    setPaymentModes(response.data);
                } else {
                    setError("Failed to load payment modes");
                }
            } catch (err: any) {
                console.error("Error fetching payment modes:", err);
                setError(err.message || "Something went wrong while fetching payment modes");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentModes();
    }, []);

    const getIcon = (mode: string) => {
        switch (mode.toLowerCase()) {
            case "card":
                return CreditCard;
            case "cashondelivery":
                return Banknote;
            case "wallet":
                return Wallet;
            default:
                return CreditCard;
        }
    };

    const getIconColor = (mode: string) => {
        switch (mode.toLowerCase()) {
            case "card":
                return "bg-[#0092FF]";
            case "cashondelivery":
                return "bg-[#4CAF50]";
            case "wallet":
                return "bg-[#FF9800]";
            default:
                return "bg-gray-400";
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
        setSelectedModeId(id);
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-6 animate-pulse">
                <div className="space-y-3">
                    <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-56 bg-gray-100 rounded-md"></div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 w-full bg-gray-100 rounded-[20px] border border-gray-100"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                    <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Payment methods unavailable</h3>
                <p className="text-gray-500 max-w-sm mb-8">{error}</p>
                <Button
                    onClick={() => window.location.reload()}
                    className="h-12 px-8 rounded-2xl font-bold shadow-lg"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full relative" style={{ fontFamily: "var(--font-poppins)" }}>
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-gray-800">
                    Cards
                </h1>
                <p className="text-gray-400 text-sm mt-0.5">
                    manage payments method
                </p>
            </header>

            {/* Payment List */}
            <div className="flex flex-col gap-4">
                {paymentModes.map((mode) => {
                    const Icon = getIcon(mode.mode);
                    const isExpanded = expandedId === mode.id;
                    const isSelected = selectedModeId === mode.id;

                    return (
                        <div
                            key={mode.id}
                            className={cn(
                                "group border transition-all duration-300 rounded-[20px] overflow-hidden",
                                isSelected ? "border-[#0092FF] shadow-sm bg-blue-50/5" : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <button
                                onClick={() => toggleExpand(mode.id)}
                                className="w-full flex items-center justify-between p-5 text-left transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-110",
                                        getIconColor(mode.mode)
                                    )}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700">
                                            {mode.mode === "Card" ? "Credit/Debit Card" : (mode.mode === "CashOnDelivery" ? "Cash On Delivery" : mode.name)}
                                        </h3>
                                        {isSelected && !isExpanded && (
                                            <p className="text-[10px] text-[#0092FF] font-bold tracking-tight uppercase flex items-center gap-1 mt-0.5">
                                                Active Session
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                        isExpanded ? "bg-blue-50 text-[#0092FF]" : "text-gray-300 group-hover:text-gray-500 group-hover:bg-gray-50"
                                    )}>
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "anticipate" }}
                                    >
                                        <div className="px-5 pb-6 pt-1 mx-5 space-y-4">
                                            <div className="h-[1px] bg-gray-100 mb-4" />
                                            {mode.mode === "Card" && (
                                                <div className="space-y-0.5">
                                                    {/* Add New Card Action */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsAddCardModalOpen(true);
                                                        }}
                                                        className="w-full flex items-center gap-4 py-3 group/add transition-colors border-0 bg-transparent text-left"
                                                    >
                                                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover/add:border-[#0092FF] group-hover/add:text-[#0092FF] transition-all">
                                                            <Plus className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-700 group-hover/add:text-[#0092FF] transition-colors">Add New Card</span>
                                                    </button>

                                                    {addedCards.length > 0 && (
                                                        <>
                                                            {/* Divider */}
                                                            <div className="h-[1px] bg-gray-100 my-2 w-full" />

                                                            {/* Added Cards List */}
                                                            <div className="space-y-2">
                                                                {addedCards.map((card: any) => (
                                                                    <button
                                                                        key={card.id}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setSelectedCardId(card.id);
                                                                        }}
                                                                        className="w-full flex items-center justify-between py-3 group/card transition-colors border-0 bg-transparent text-left"
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            {/* Card Brand Icon Mock */}
                                                                            {card.brand === "visa" ? (
                                                                                <div className="text-[14px] font-[900] text-[#1a1f71] italic tracking-tighter w-8">VISA</div>
                                                                            ) : (
                                                                                <div className="flex -space-x-1.5 opacity-90 group-hover/card:opacity-100 transition-opacity w-8">
                                                                                    <div className="w-5 h-5 rounded-full bg-[#eb001b]"></div>
                                                                                    <div className="w-5 h-5 rounded-full bg-[#f79e1b] opacity-80"></div>
                                                                                </div>
                                                                            )}
                                                                            <span className="text-sm font-bold text-gray-500 tracking-wider">
                                                                                •••• •••• •••• {card.last4}
                                                                            </span>
                                                                        </div>

                                                                        {/* Custom Radio Button */}
                                                                        <div className={cn(
                                                                            "w-5 h-5 rounded-full border transition-all flex items-center justify-center",
                                                                            selectedCardId === card.id
                                                                                ? "border-[#0092FF] bg-white shadow-sm shadow-[#0092FF]/20"
                                                                                : "border-gray-200 bg-white group-hover/card:border-[#0092FF]/50"
                                                                        )}>
                                                                            {selectedCardId === card.id && (
                                                                                <div className="w-3 h-3 rounded-full bg-[#0092FF]" />
                                                                            )}
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            {mode.mode === "Wallet" && (
                                                <div className="space-y-3">
                                                    <p className="text-[13px] text-gray-500 leading-relaxed">Pay effortlessly using your digital wallet balance. Instant refunds and easy tracking.</p>
                                                    <div className="p-5 bg-[#0092FF]/5 rounded-2xl flex items-center justify-between border border-[#0092FF]/10">
                                                        <div className="flex flex-col">
                                                            <span className="text-[11px] uppercase tracking-wider font-bold text-[#0092FF]/60 mb-1">Available Balance</span>
                                                            <span className="text-2xl font-bold text-[#0092FF] tracking-tight">$0.00</span>
                                                        </div>
                                                        <Button variant="outline" size="sm" className="rounded-xl border-[#0092FF] text-[#0092FF] hover:bg-[#0092FF] hover:text-white transition-all">
                                                            Top Up
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                            {mode.mode === "CashOnDelivery" && (
                                                <div className="space-y-3">
                                                    <p className="text-[13px] text-gray-500 leading-relaxed">Pay with cash when your shipment arrives at your doorstep. Please ensure to have exact change ready if possible.</p>
                                                    <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl text-xs font-medium border border-green-100">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        Available for orders up to $500
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Footer Action */}
            <div className="mt-12 flex justify-end items-center gap-4">
                <Button
                    disabled={!selectedModeId}
                    className={cn(
                        "h-14 px-12 rounded-[18px] font-bold text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]",
                        !selectedModeId && "opacity-50 grayscale"
                    )}
                >
                    Save
                </Button>
            </div>

            {/* Modal */}
            <AddCardModal
                isOpen={isAddCardModalOpen}
                onClose={() => setIsAddCardModalOpen(false)}
            />
        </div>
    );
}
