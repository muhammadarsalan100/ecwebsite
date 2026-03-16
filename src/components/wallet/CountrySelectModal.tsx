"use client";

import { useState, useEffect } from "react";
import { Search, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Country, CountrySelectModalProps } from "@/types";
import { useConfigStore } from "@/lib/store/configStore";


export function CountrySelectModal({ isOpen, onClose, onSelect, selectedCountry: propSelectedCountry }: CountrySelectModalProps) {
    const { countries, fetchCountries, isLoading } = useConfigStore();
    const [searchTerm, setSearchTerm] = useState("");

    const getFlagUrl = (country: Country) => {
        return country.flagUrl;
    };

    useEffect(() => {
        if (isOpen && countries.length === 0) {
            fetchCountries();
        }
    }, [isOpen, countries.length, fetchCountries]);

    const filteredCountries = countries.filter((c: Country) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-white w-full max-w-[500px] max-h-[90vh] md:h-[600px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-8 pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Select your Country</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search your Country"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* Country List */}
                    <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-500 font-medium">Loading countries...</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {filteredCountries.map((country: Country) => (
                                    <button
                                        key={country.id}
                                        onClick={() => {
                                            onSelect(country);
                                            onClose();
                                        }}
                                        className="w-full flex items-center justify-between p-4 px-6 hover:bg-gray-50 rounded-2xl transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0 flex items-center justify-center bg-white">
                                                {getFlagUrl(country) ? (
                                                    <Image
                                                        src={getFlagUrl(country)}
                                                        alt={country.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span className="text-xs font-bold text-[#0092FF]">{country.shortCode || country.name.substring(0, 2).toUpperCase()}</span>
                                                )}
                                            </div>
                                            <span className={`text-[16px] font-bold ${propSelectedCountry === country.name ? 'text-blue-600' : 'text-gray-900'}`}>
                                                {country.name}
                                            </span>
                                        </div>
                                        {propSelectedCountry === country.name && (
                                            <Check className="w-5 h-5 text-blue-600" />
                                        )}
                                    </button>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <div className="text-center py-10 text-gray-400">
                                        No countries found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
