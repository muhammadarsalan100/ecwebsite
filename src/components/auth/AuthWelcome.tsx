"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthWelcomeProps } from "@/types/auth";
import worldMap from "../../../public/world-map.png";
import { motion } from "framer-motion";
import { useConfigStore } from "@/lib/store/configStore";
import { useAuth } from "@/lib/auth-context";
import { CountrySelectModal } from "../wallet/CountrySelectModal";

export function AuthWelcome({ onContinue }: AuthWelcomeProps) {
    const {
        selectedCountry,
        selectedLanguage,
        selectedCurrency,
        setSelectedCountry,
        countries,
        fetchCountries
    } = useConfigStore();

    const { isLoading: isAuthLoading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial pre-selection logic for UAE (Primary) or Pakistan (Fallback)
    useEffect(() => {
        if (isAuthLoading) return; // Wait for authentication initialization (guest/user)

        const selectDefaultCountry = () => {
            if (selectedCountry) return; // Don't override existing selection

            // Priority 1: UAE
            const uae = countries.find(c =>
                c.name.toLowerCase() === "uae" ||
                c.shortCode.toUpperCase() === "AE" ||
                c.shortCode.toUpperCase() === "UAE" ||
                c.name.toLowerCase().includes("united arab emirates")
            );

            // Priority 2: Pakistan
            const pk = countries.find(c =>
                c.name.toLowerCase() === "pakistan" ||
                c.shortCode.toUpperCase() === "PK"
            );

            const defaultCountry = uae || pk || countries[0];

            if (defaultCountry) {
                // @ts-ignore - Handle type mismatch between wallet Country and store Country
                setSelectedCountry(defaultCountry);
            }
        };

        if (countries.length === 0) {
            fetchCountries().then(selectDefaultCountry);
        } else {
            selectDefaultCountry();
        }
    }, [isAuthLoading, countries, selectedCountry, setSelectedCountry, fetchCountries]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className='relative w-full max-w-md h-[85vh] sm:h-[90vh] max-h-[750px] flex flex-col bg-white rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl'
            >
                {/* Header */}
                <div className="py-6 border-b border-gray-100 mb-2">
                    <h1 className="text-center text-xl font-bold text-[#1A1A1A]">Country Region</h1>
                </div>

                <div className="flex-grow px-8 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx global>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {/* World Map Section */}
                    <div className="py-8 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full aspect-[2/1] max-w-[320px] mb-8"
                        >
                            <Image
                                src={worldMap}
                                alt="World Map"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-[26px] font-bold text-[#1A1A1A] tracking-tight text-center"
                        >
                            Welcome to Mega Mart
                        </motion.h2>
                        <p className="text-[#8A8A8A] text-sm font-medium mt-2 text-center">
                            Set your preferences to start exploring
                        </p>
                    </div>

                    {/* Selection Fields */}
                    <div className="space-y-4 mt-6">
                        {/* Country/Region */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="group cursor-pointer p-5 bg-gray-50 hover:bg-white rounded-2xl border border-transparent hover:border-[#0092FF] transition-all duration-300 hover:shadow-md"
                        >
                            <p className="text-[12px] text-[#A6A6A6] font-bold mb-2 uppercase tracking-widest">Country/Region</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {selectedCountry ? (
                                        <>
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm">
                                                <Image
                                                    src={selectedCountry.flagUrl}
                                                    alt={selectedCountry.name}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <span className="text-base font-bold text-[#1A1A1A]">{selectedCountry.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <Globe className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span className="text-base font-bold text-[#A6A6A6]">Select Country</span>
                                        </>
                                    )}
                                </div>
                                <ChevronRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#0092FF] transition-all group-hover:translate-x-1" />
                            </div>
                        </div>

                        {/* Language */}
                        <div className="group cursor-pointer p-5 bg-gray-50 hover:bg-white rounded-2xl border border-transparent hover:border-[#0092FF] transition-all duration-300 hover:shadow-md">
                            <p className="text-[12px] text-[#A6A6A6] font-bold mb-2 uppercase tracking-widest">Language</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-base font-bold ${selectedLanguage ? 'text-[#1A1A1A]' : 'text-[#A6A6A6]'}`}>
                                    {selectedLanguage || "Select Language"}
                                </span>
                                <ChevronRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#0092FF] transition-all group-hover:translate-x-1" />
                            </div>
                        </div>

                        {/* Currency */}
                        <div className="group cursor-pointer p-5 bg-gray-50 hover:bg-white rounded-2xl border border-transparent hover:border-[#0092FF] transition-all duration-300 hover:shadow-md">
                            <p className="text-[12px] text-[#A6A6A6] font-bold mb-2 uppercase tracking-widest">Currency</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-base font-bold ${selectedCurrency ? 'text-[#1A1A1A]' : 'text-[#A6A6A6]'}`}>
                                    {selectedCurrency || "Select Currency"}
                                </span>
                                <ChevronRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#0092FF] transition-all group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Button */}
                <div className="p-8 pb-10 bg-white">
                    <Button
                        onClick={onContinue}
                        disabled={!selectedCountry}
                        className="w-full h-[62px] text-lg font-bold bg-[#0092FF] hover:bg-[#0081E0] text-white rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                        Go Shopping
                    </Button>
                </div>
            </motion.div>

            <CountrySelectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={setSelectedCountry as any}
                selectedCountry={selectedCountry?.name}
            />
        </div>
    );
}
