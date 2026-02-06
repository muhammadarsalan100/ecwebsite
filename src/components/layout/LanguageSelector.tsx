"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";

export interface Language {
    code: string;
    name: string;
    flag: string;
}

export const LANGUAGES: Language[] = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w80/us.png" },
    { code: "zh", name: "Mandarin", flag: "https://flagcdn.com/w80/cn.png" },
    { code: "ru", name: "Russian", flag: "https://flagcdn.com/w80/ru.png" },
];

interface LanguageSelectorProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedLang: Language;
    onSelect: (lang: Language) => void;
}

export function LanguageSelector({
    isOpen,
    setIsOpen,
    selectedLang,
    onSelect,
}: LanguageSelectorProps) {
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium text-white group"
            >
                <span className="text-sm md:text-base opacity-90 group-hover:opacity-100">{selectedLang.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-3 min-w-[200px] z-[100] border border-gray-100 overflow-hidden"
                    >
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    onSelect(lang);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors group/item"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 relative rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                        <Image
                                            src={lang.flag}
                                            alt={lang.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <span className={`text-[15px] font-medium transition-colors ${selectedLang.code === lang.code ? "text-gray-900" : "text-gray-600 group-hover/item:text-gray-900"}`}>
                                        {lang.name}
                                    </span>
                                </div>
                                {selectedLang.code === lang.code && (
                                    <Check className="w-4 h-4 text-[#0092FF] stroke-[3]" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
