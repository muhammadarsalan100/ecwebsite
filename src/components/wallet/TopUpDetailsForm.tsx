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
    Building,
    Smartphone,
    Landmark,
    Phone
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelectModal } from "./CountrySelectModal";
import { TransactionSuccessModal } from "./TransactionSuccessModal";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { TopUpDetailsFormProps } from "@/types";

export function TopUpDetailsForm({ topUpType, amount, onConfirm, onEdit }: TopUpDetailsFormProps) {
    const router = useRouter();
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    // Map internal values to display labels
    const typeMap: Record<string, { label: string; icon: any }> = {
        'mobile_money': { label: 'Mobile Money', icon: Smartphone },
        'bank_account': { label: 'Bank Account', icon: Landmark }
    };

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);
            const response = await authService.createTopUpRequest(amount);

            if (response && response.data?.url) {
                // Open the payment URL in the same window (or new window if preferred)
                window.location.href = response.data.url;
            } else {
                // Return to using the static success modal as requested
                setIsSuccessModalOpen(true);
            }
        } catch (error) {
            console.error("TopUp request failed:", error);
            // In a real app we'd show a toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    const showBankFields = topUpType === 'bank_account';
    const currentType = typeMap[topUpType] || typeMap['mobile_money'];

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
                                <span className="font-bold text-foreground text-[15px]">{topUpType === 'mobile_money' ? 'Mobile' : currentType.label}</span>
                            </div>
                            <button onClick={() => onEdit?.('type')} className="text-gray-300 hover:text-blue-500 transition-colors p-1">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Conditional: Enter Mobile Phone or Select Bank */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                            {topUpType === 'mobile_money' ? 'Enter Mobile Phone' : 'Select Bank'}
                        </label>
                        <div className="relative">
                            {topUpType === 'mobile_money' ? (
                                <>
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                    <Input
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Select Mobile Number"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            setPhoneNumber(value);
                                        }}
                                        className="h-[64px] pl-16 pr-6 border-border bg-card rounded-2xl shadow-sm text-[15px] font-bold text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus:border-primary transition-all"
                                    />
                                </>
                            ) : (
                                <div className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] cursor-pointer hover:bg-accent hover:border-primary transition-all">
                                    <div className="flex items-center gap-4">
                                        <Building className="w-5 h-5 text-gray-400" />
                                        <span className="font-bold text-gray-400 text-[15px]">Select Bank</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-300" />
                                </div>
                            )}
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

                    {/* Country */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Country</label>
                        <div className="relative">
                            <div
                                onClick={() => setIsCountryModalOpen(true)}
                                className="flex items-center justify-between px-6 bg-card border border-border rounded-2xl shadow-sm h-[64px] cursor-pointer hover:bg-accent hover:border-primary transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {selectedCountry ? (
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
                                        <Globe className="w-5 h-5 text-gray-400" />
                                    )}
                                    <span className={`font-bold text-[15px] ${selectedCountry ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {selectedCountry?.name || 'Select Country'}
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
                    disabled={isSubmitting}
                    className="w-full md:w-[400px] bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold py-8 rounded-2xl text-xl shadow-2xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                    {isSubmitting ? 'Processing...' : 'Confirm'}
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
