"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfigStore } from "@/lib/store/configStore";
import { useDebounce, useClickOutside } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

export function SearchBar({ isMobile, onClose }: SearchBarProps) {
    const [searchKey, setSearchKey] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const debouncedSearchKey = useDebounce(searchKey, 500);
    const { searchItems, isSearchLoading, fetchSearchItems } = useConfigStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useClickOutside(dropdownRef, () => setIsOpen(false));

    useEffect(() => {
        if (debouncedSearchKey.trim().length >= 2) {
            fetchSearchItems(debouncedSearchKey);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [debouncedSearchKey, fetchSearchItems]);

    const handleSearchItemClick = (id: number | string) => {
        setIsOpen(false);
        setSearchKey("");
        router.push(`/product/${id}`);
        if (onClose) onClose();
    };

    const resultsDropdown = (
        <AnimatePresence>
            {isOpen && (searchItems.length > 0 || isSearchLoading) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute left-0 right-0 z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ${
                        isMobile ? 'top-full' : 'top-full'
                    }`}
                >
                    <div className="max-h-[400px] overflow-y-auto">
                        {isSearchLoading ? (
                            <div className="p-8 flex flex-col items-center justify-center text-gray-400">
                                <Loader2 className="w-8 h-8 animate-spin mb-2 text-[#0092FF]" />
                                <p className="text-sm font-medium">Searching for products...</p>
                            </div>
                        ) : searchItems.length > 0 ? (
                            <div className="py-2">
                                <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    Search Results
                                </p>
                                {searchItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSearchItemClick(item.id)}
                                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-colors text-left group"
                                    >
                                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl overflow-hidden shrink-0 p-1 flex items-center justify-center">
                                            {item.icon ? (
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded">
                                                    <Search className="w-4 h-4 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#0092FF] transition-colors">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-[#0092FF] font-bold mt-0.5">
                                                {item.currencyCode} {item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : debouncedSearchKey.length >= 2 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p className="text-sm font-medium">No results found for &quot;{debouncedSearchKey}&quot;</p>
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (isMobile) {
        return (
            <div className="p-4" ref={dropdownRef}>
                <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-gray-100">
                    <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search essentials, groceries and more..."
                        className="w-full py-3 pl-10 pr-10 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        autoFocus
                    />
                    {searchKey ? (
                        <button
                            onClick={() => setSearchKey("")}
                            className="absolute right-10 p-2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    ) : null}
                    <button
                        onClick={onClose}
                        className="p-2 mr-1 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {resultsDropdown}
                </div>
            </div>
        );
    }

    return (
        <div className='hidden md:flex flex-1 max-w-2xl mx-6 relative' ref={dropdownRef}>
            <div className='relative w-full flex items-center'>
                <Search className='absolute left-5 w-6 h-6 text-[#0092FF]' />
                <input
                    type='text'
                    placeholder='Search essentials, groceries and more...'
                    className='w-full bg-card border-border border py-4 pl-14 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground shadow-lg shadow-black/5 rounded-[12px] placeholder:text-muted-foreground font-medium'
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                {searchKey && (
                    <button
                        onClick={() => setSearchKey("")}
                        className="absolute right-4 p-2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
            {resultsDropdown}
        </div>
    );
}
