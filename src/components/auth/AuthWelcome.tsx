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
        if (isAuthLoading) return;

        const selectDefaultCountry = () => {
            if (selectedCountry) return;

            const uae = countries.find(c =>
                c.name.toLowerCase() === "uae" ||
                c.shortCode.toUpperCase() === "AE" ||
                c.shortCode.toUpperCase() === "UAE" ||
                c.name.toLowerCase().includes("united arab emirates")
            );

            const pk = countries.find(c =>
                c.name.toLowerCase() === "pakistan" ||
                c.shortCode.toUpperCase() === "PK"
            );

            const defaultCountry = uae || pk || countries[0];

            if (defaultCountry) {
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className='relative w-full max-w-[440px] flex flex-col bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]'
            >
                <div className="pt-8 pb-4 text-center">
                    <span className="text-[10px] font-bold text-[#0092FF] uppercase tracking-[0.3em] mb-2 block">Preferences</span>
                    <h1 className="text-xl font-bold text-[#1A1A1A]">Shopping Experience</h1>
                </div>

                <div className="px-8 pb-8 overflow-y-auto max-h-[70vh] scrollbar-hide">
                    <style jsx global>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

                    <div className="py-6 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full aspect-[2/1] max-w-[280px] mb-6 opacity-80"
                        >
                            <Image src={worldMap} alt="World Map" fill className="object-contain" priority />
                        </motion.div>
                        <h2 className="text-lg font-bold text-[#1A1A1A] text-center">
                            Welcome to Mega Mart
                        </h2>
                        <p className="text-[#8E8E93] text-[13px] font-medium mt-1.5 text-center">
                            Select your region to view local products and pricing.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {/* Shopping Place Selection */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="group cursor-pointer p-4 bg-white hover:bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:border-[#0092FF] transition-all duration-300 active:scale-[0.99]"
                        >
                            <p className="text-[10px] text-[#A6A6A6] font-bold mb-2 uppercase tracking-widest">Shopping Place</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {selectedCountry ? (
                                        <>
                                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-100">
                                                <Image src={selectedCountry.flagUrl} alt={selectedCountry.name} fill className="object-cover" unoptimized />
                                            </div>
                                            <span className="text-[15px] font-bold text-[#1A1A1A]">{selectedCountry.name}</span>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Globe className="w-3.5 h-3.5 text-gray-400" />
                                            </div>
                                            <span className="text-[15px] font-bold text-[#A6A6A6]">Select Region</span>
                                        </div>
                                    )}
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#0092FF] transition-all" />
                            </div>
                        </div>

                        {/* Language Selection */}
                        <div className="group cursor-pointer p-4 bg-white hover:bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:border-[#0092FF] transition-all duration-300 active:scale-[0.99]">
                            <p className="text-[10px] text-[#A6A6A6] font-bold mb-2 uppercase tracking-widest">Language</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-[15px] font-bold ${selectedLanguage ? 'text-[#1A1A1A]' : 'text-[#A6A6A6]'}`}>
                                    {selectedLanguage || "Select Language"}
                                </span>
                                <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#0092FF] transition-all" />
                            </div>
                        </div>

                        {/* Currency Selection */}
                        <div className="group cursor-pointer p-4 bg-white hover:bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:border-[#0092FF] transition-all duration-300 active:scale-[0.99]">
                            <p className="text-[10px] text-[#A6A6A6] font-bold mb-2 uppercase tracking-widest">Currency</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-[15px] font-bold ${selectedCurrency ? 'text-[#1A1A1A]' : 'text-[#A6A6A6]'}`}>
                                    {selectedCurrency || "Select Currency"}
                                </span>
                                <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#0092FF] transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 pt-2">
                    <Button
                        onClick={onContinue}
                        disabled={!selectedCountry}
                        className="w-full h-14 text-sm font-bold bg-[#0092FF] hover:bg-[#0081E0] text-white rounded-2xl shadow-xl shadow-blue-500/10 transition-all hover:translate-y-[-1px] active:translate-y-[0px] active:scale-[0.98] disabled:opacity-40"
                    >
                        Enter Marketplace
                    </Button>
                </div>
            </motion.div>

            <CountrySelectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={setSelectedCountry}
                selectedCountry={selectedCountry?.name}
            />
        </div>
    );
}
