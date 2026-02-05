"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Globe } from "lucide-react";
import { RegionSelectorProps } from "@/types";

export function RegionSelector({
    isOpen,
    setIsOpen,
    selectedCountry,
    setSelectedCountry,
    countries,
    isMobile = false
}: RegionSelectorProps) {
    if (isMobile) {
        return (
            <div className='rounded-xl overflow-hidden border border-gray-100'>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors'
                >
                    <div className='flex items-center gap-3'>
                        <Globe className='w-4 h-4 text-gray-500' />
                        <span className='text-sm font-medium text-gray-700'>Region</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-5 h-4 relative overflow-hidden rounded-sm shadow-sm'>
                            <Image src={selectedCountry.flag} alt='Flag' fill className='object-cover' />
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className='bg-gray-50 border-t border-gray-100'
                        >
                            {countries.map((country) => (
                                <button
                                    key={country.code}
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-11 py-2.5 transition-colors text-left text-sm ${selectedCountry.code === country.code
                                        ? "text-[#0092FF] font-medium bg-blue-50/50"
                                        : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    <div className='w-5 h-4 relative overflow-hidden rounded-sm shrink-0 shadow-sm'>
                                        <Image src={country.flag} alt={country.name} fill className='object-cover' />
                                    </div>
                                    <span>{country.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className='relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2.5 hover:opacity-80 transition-opacity'
            >
                <div className='w-6 h-5 relative overflow-hidden rounded-sm shrink-0'>
                    <Image src={selectedCountry.flag} alt='Flag' fill className='object-cover' />
                </div>
                <span className="font-medium text-base text-white">Region</span>
                <ChevronDown className='w-4 h-4 text-white' />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-3 min-w-[200px] z-50 text-black'
                    >
                        {countries.map((country) => (
                            <button
                                key={country.code}
                                onClick={() => {
                                    setSelectedCountry(country);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors ${selectedCountry.code === country.code ? "bg-gray-50" : ""
                                    }`}
                            >
                                <div className='w-6 h-5 relative overflow-hidden rounded-sm shrink-0'>
                                    <Image src={country.flag} alt={country.name} fill className='object-cover' />
                                </div>
                                <span className='text-base text-gray-700'>{country.name}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
