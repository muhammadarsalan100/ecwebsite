"use client";

import { useState } from "react";
import {
    Globe,
    User,
    MapPin,
    Banknote,
    Wallet,
    PencilLine,
    ChevronDown,
    Building
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelectModal } from "./CountrySelectModal";
import { TransactionSuccessModal } from "./TransactionSuccessModal";
import { TopUpDetailsFormProps } from "@/types";



export function TopUpDetailsForm({ topUpType, amount, onConfirm, onEdit }: TopUpDetailsFormProps) {
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string } | null>(null);

    // Map internal values to display labels
    const typeMap: Record<string, { label: string; icon: any }> = {
        'agent': { label: 'Pick up by Agent', icon: User },
        'branch': { label: 'Nearest Branch', icon: Building },
        'go_agent': { label: 'Go to Agent', icon: MapPin }
    };

    const handleConfirm = () => {
        setIsSuccessModalOpen(true);
        // onConfirm?.();
    };

    const showBankFields = topUpType === 'branch' || topUpType === 'go_agent';
    const currentType = typeMap[topUpType] || typeMap['agent'];

    // Format current date for modal: Dec 23, 2024 . 9:34 PM
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) + " . " + now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Debit Account */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Debit Account</label>
                        <div className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] hover:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <Globe className="w-5 h-5 text-foreground" />
                                <span className="font-bold text-foreground text-[15px]">Aruban Florin (AWG)</span>
                            </div>
                            <button onClick={() => onEdit?.('account')} className="text-gray-300 hover:text-blue-500 transition-colors p-1">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Top Up Type */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Top Up Type</label>
                        <div className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] hover:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <currentType.icon className="w-5 h-5 text-foreground" />
                                <span className="font-bold text-foreground text-[15px]">{currentType.label}</span>
                            </div>
                            <button onClick={() => onEdit?.('type')} className="text-gray-300 hover:text-blue-500 transition-colors p-1">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Conditional: Select Bank or Select Location */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                            {showBankFields ? 'Select Bank' : 'Select Location'}
                        </label>
                        <div className="relative">
                            <div className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] cursor-pointer hover:bg-accent hover:border-primary transition-all">
                                <div className="flex items-center gap-4">
                                    {showBankFields ? (
                                        <Building className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                    )}
                                    <span className="font-bold text-gray-400 text-[15px]">
                                        {showBankFields ? 'Select Bank' : 'Nearest Location'}
                                    </span>
                                </div>
                                <ChevronDown className="w-5 h-5 text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Amount From AWG */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Amount From AWG</label>
                        <div className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] hover:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <Banknote className="w-5 h-5 text-foreground" />
                                <span className="font-bold text-foreground text-[15px]">{amount}</span>
                            </div>
                            <button onClick={() => onEdit?.('amount')} className="text-gray-300 hover:text-blue-500 transition-colors p-1">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Conditional: Country or Charge Type */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                            {showBankFields ? 'Country' : 'Charge Type'}
                        </label>
                        <div className="relative">
                            <div
                                onClick={() => showBankFields && setIsCountryModalOpen(true)}
                                className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] cursor-pointer hover:bg-accent hover:border-primary transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {showBankFields && selectedCountry ? (
                                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                            <Image
                                                src={`https://flagcdn.com/w80/${selectedCountry.code}.png`}
                                                alt={selectedCountry.name}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        showBankFields ? (
                                            <Globe className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <Wallet className="w-5 h-5 text-gray-400" />
                                        )
                                    )}
                                    <span className={`font-bold text-[15px] ${selectedCountry && showBankFields ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {showBankFields ? (selectedCountry?.name || 'Select Country') : 'Select Charge Type'}
                                    </span>
                                </div>
                                <ChevronDown className="w-5 h-5 text-gray-300" />
                            </div>
                        </div>
                    </div>

                    {/* Deposit Purpose */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Deposit Purpose</label>
                        <Input
                            placeholder="Deposit Purpose"
                            className="h-[64px] border-border bg-card rounded-2xl shadow-sm px-6 text-[15px] font-bold text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Confirm Button */}
            <div className="pt-20 flex justify-center">
                <Button
                    onClick={handleConfirm}
                    className="w-full md:w-[400px] bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold py-8 rounded-2xl text-xl shadow-2xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Confirm
                </Button>
            </div>

            {/* Country Selection Modal */}
            <CountrySelectModal
                isOpen={isCountryModalOpen}
                onClose={() => setIsCountryModalOpen(false)}
                onSelect={(country) => setSelectedCountry(country)}
                selectedCountry={selectedCountry?.name}
            />

            {/* Success Modal */}
            <TransactionSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={{
                    amount: amount,
                    cardNumber: "*** *** *** 3465",
                    paymentMethod: "Credit Card",
                    date: formattedDate,
                    transactionId: "3297642835y934"
                }}
            />
        </div>
    );
}
