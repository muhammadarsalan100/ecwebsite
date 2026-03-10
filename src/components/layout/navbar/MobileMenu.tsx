"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Home, Store, ShieldCheck, LogOut, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RegionSelector } from "../RegionSelector";
import { useCartStore } from "@/lib/store/cartStore";

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: any;
    logout: () => void;
    isMobileRegionOpen: boolean;
    setIsMobileRegionOpen: (isOpen: boolean) => void;
    selectedCountry: any;
    setSelectedCountry: (country: any) => void;
    countries: any[];
}

export function MobileMenu({
    isOpen,
    setIsOpen,
    isLoading,
    isAuthenticated,
    user,
    logout,
    isMobileRegionOpen,
    setIsMobileRegionOpen,
    selectedCountry,
    setSelectedCountry,
    countries
}: MobileMenuProps) {
    const cartItems = useCartStore((state) => state.items);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className='fixed inset-0 z-[60] bg-white md:hidden overflow-y-auto flex flex-col'
                >
                    {/* Header */}
                    <div className='flex items-center justify-between px-6 py-5 bg-[#0092FF] text-white shadow-md shrink-0 sticky top-0 z-50'>
                        <Link href='/' onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <Image
                                src="/Logo1.png"
                                alt="Logo"
                                width={140}
                                height={42}
                                className="h-9 w-auto object-contain brightness-0 invert"
                                priority
                                style={{ height: '36px', width: 'auto' }}
                            />
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className='p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm'
                        >
                            <X className='w-6 h-6' />
                        </button>
                    </div>

                    <div className='flex-1 p-6 space-y-8 overflow-y-auto'>
                        {/* User Profile Section */}
                        {isLoading ? (
                            <div className="flex items-center gap-4 px-5 py-6 bg-gray-50 rounded-3xl animate-pulse border border-gray-100">
                                <div className="w-14 h-14 bg-gray-200 rounded-full" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-32" />
                                    <div className="h-3 bg-gray-200 rounded w-24" />
                                </div>
                            </div>
                        ) : isAuthenticated ? (
                            <div className="space-y-4">
                                <div className='flex items-center gap-4 px-5 py-6 bg-white border border-blue-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='w-14 h-14 bg-[#0092FF] text-white rounded-full shadow-lg shadow-blue-200 flex items-center justify-center shrink-0 text-xl font-bold'>
                                        {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className='text-[10px] font-bold text-[#0092FF] mb-1 uppercase tracking-widest'>Welcome Back</p>
                                        <p className='font-bold text-gray-900 truncate text-lg leading-tight'>{user?.name || user?.email?.split('@')[0]}</p>
                                        <p className='text-xs text-gray-400 truncate mt-0.5'>{user?.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/wallet"
                                        onClick={() => setIsOpen(false)}
                                        className="flex flex-col items-center justify-center gap-3 p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 rounded-3xl transition-all group"
                                    >
                                        <div className="w-12 h-12 bg-[#0092FF] rounded-full shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform flex items-center justify-center">
                                            <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain brightness-0 invert" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#0092FF] transition-colors">Wallet</span>
                                    </Link>
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsOpen(false)}
                                        className="flex flex-col items-center justify-center gap-3 p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 rounded-3xl transition-all group"
                                    >
                                        <div className="w-12 h-12 bg-[#0092FF] rounded-full shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform flex items-center justify-center relative">
                                            <ShoppingCart className="w-6 h-6 text-white" />
                                            {cartItems.length > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                                    {cartItems.length}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#0092FF] transition-colors">Cart</span>
                                    </Link>
                                </div>

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-5 py-4 text-base font-bold text-red-600 bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-between group"
                                >
                                    <span className="flex items-center gap-3 font-bold group-hover:translate-x-1 transition-transform">
                                        <LogOut className="w-5 h-5" />
                                        Sign Out
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-[#0092FF] to-[#0070C6] rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-2">Welcome to MegaMart</h3>
                                    <p className="text-blue-100 text-sm mb-6">Sign in to access your wallet, track orders, and faster checkout.</p>
                                    <Link
                                        href='/auth'
                                        onClick={() => setIsOpen(false)}
                                        className='w-full bg-white text-[#0092FF] py-3 px-4 rounded-xl font-bold text-center block hover:bg-blue-50 transition-colors shadow-sm'
                                    >
                                        Sign In / Register
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Navigation Links */}
                        <div className='space-y-2'>
                            <p className='px-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest'>Menu</p>
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className='flex items-center gap-4 px-4 py-3.5 text-base font-bold text-gray-700 hover:text-[#0092FF] hover:bg-blue-50 rounded-xl transition-all group'
                            >
                                <Home className="w-5 h-5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                onClick={() => setIsOpen(false)}
                                className='flex items-center gap-4 px-4 py-3.5 text-base font-bold text-gray-700 hover:text-[#0092FF] hover:bg-blue-50 rounded-xl transition-all group'
                            >
                                <Store className="w-5 h-5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                Shop
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsOpen(false)}
                                className='flex items-center gap-4 px-4 py-3.5 text-base font-bold text-gray-700 hover:text-[#0092FF] hover:bg-blue-50 rounded-xl transition-all group'
                            >
                                <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                About Us
                            </Link>
                        </div>

                        {/* Settings Section */}
                        <div className='pt-6 border-t border-gray-100'>
                            <p className='px-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest'>PREFERENCES</p>
                            <RegionSelector
                                isOpen={isMobileRegionOpen}
                                setIsOpen={setIsMobileRegionOpen}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                                countries={countries}
                                isMobile
                            />
                            <div className="mt-4 px-2">
                                <p className="text-xs text-gray-400 text-center">Version 1.0.0 • © 2025 MegaMart</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
