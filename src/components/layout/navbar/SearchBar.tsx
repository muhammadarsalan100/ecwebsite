"use client";

import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

export function SearchBar({ isMobile, onClose }: SearchBarProps) {
    if (isMobile) {
        return (
            <div className="p-4">
                <div className="relative flex items-center bg-white rounded-xl shadow-sm">
                    <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search essentials, groceries and more..."
                        className="w-full py-3 pl-10 pr-4 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="p-2 mr-1 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='hidden md:flex flex-1 max-w-2xl mx-6'>
            <div className='relative w-full flex items-center'>
                <Search className='absolute left-5 w-6 h-6 text-[#0092FF]' />
                <input
                    type='text'
                    placeholder='Search essentials, groceries and more...'
                    className='w-full bg-card border-border border py-4 pl-14 pr-6 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground shadow-lg shadow-black/5 rounded-[12px] placeholder:text-muted-foreground font-medium'
                />
            </div>
        </div>
    );
}
