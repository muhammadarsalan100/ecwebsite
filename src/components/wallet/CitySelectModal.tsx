"use client";

import { useState, useEffect } from "react";
import { Search, Check, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { City, CitySelectModalProps } from "@/types";
import { useConfigStore } from "@/lib/store/configStore";

export function CitySelectModal({ isOpen, onClose, onSelect, selectedCity: propSelectedCity, stateId }: CitySelectModalProps) {
    const { cities, fetchCities, isCitiesLoading } = useConfigStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (isOpen && stateId) {
            fetchCities(stateId);
        }
    }, [isOpen, stateId, fetchCities]);

    const filteredCities = cities.filter((c: City) =>
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
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
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
                            <h2 className="text-2xl font-bold text-gray-900">Select City</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search City"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* City List */}
                    <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
                        {!stateId ? (
                            <div className="flex flex-col items-center justify-center h-full text-center px-10">
                                <MapPin className="w-12 h-12 text-gray-200 mb-4" />
                                <p className="text-gray-500 font-medium">Please select a state first</p>
                            </div>
                        ) : isCitiesLoading ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-500 font-medium">Loading cities...</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {filteredCities.map((city: City) => (
                                    <button
                                        key={city.id}
                                        onClick={() => {
                                            onSelect(city);
                                            onClose();
                                        }}
                                        className="w-full flex items-center justify-between p-4 px-6 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center border transition-colors",
                                                propSelectedCity === city.name
                                                    ? "bg-blue-50 border-blue-200 text-blue-600"
                                                    : "bg-gray-50 border-gray-100 text-gray-400"
                                            )}>
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[16px] font-bold ${propSelectedCity === city.name ? 'text-blue-600' : 'text-gray-900'}`}>
                                                {city.name}
                                            </span>
                                        </div>
                                        {propSelectedCity === city.name && (
                                            <Check className="w-5 h-5 text-blue-600" />
                                        )}
                                    </button>
                                ))}
                                {filteredCities.length === 0 && (
                                    <div className="text-center py-10 text-gray-400">
                                        No cities found
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

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
