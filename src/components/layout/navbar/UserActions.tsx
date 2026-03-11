"use client";

import Link from "next/link";
import Image from "next/image";
import { User, ShoppingCart, History, Store, Award, Globe, ArrowRight, X, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RegionSelector } from "../RegionSelector";
import { useCartStore, useCartSubtotal } from "@/lib/store/cartStore";

interface UserActionsProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: any;
    logout: () => void;
    isAuthOpen: boolean;
    setIsAuthOpen: (isOpen: boolean) => void;
    isWalletOpen: boolean;
    setIsWalletOpen: (isOpen: boolean) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isRegionOpen: boolean;
    setIsRegionOpen: (isOpen: boolean) => void;
    selectedCountry: any;
    setSelectedCountry: (country: any) => void;
    countries: any[];
    authRef: React.RefObject<HTMLDivElement | null>;
    walletRef: React.RefObject<HTMLDivElement | null>;
    cartRef: React.RefObject<HTMLDivElement | null>;
    regionRef: React.RefObject<HTMLDivElement | null>;
}
export function UserActions({
    isLoading,
    isAuthenticated,
    user,
    logout,
    isAuthOpen,
    setIsAuthOpen,
    isWalletOpen,
    setIsWalletOpen,
    isCartOpen,
    setIsCartOpen,
    isRegionOpen,
    setIsRegionOpen,
    selectedCountry,
    setSelectedCountry,
    countries,
    authRef,
    walletRef,
    cartRef,
    regionRef
}: UserActionsProps) {
    const cartItems = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const subtotal = useCartSubtotal();

    return (
        <div className='hidden md:flex items-center gap-8'>
            {/* Region Selector */}
            <div ref={regionRef}>
                <RegionSelector
                    isOpen={isRegionOpen}
                    setIsOpen={setIsRegionOpen}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    countries={countries}
                />
            </div>

            {/* Account Section */}
            {isLoading ? (
                <div className="w-28 h-8 bg-white/10 animate-pulse rounded-full" />
            ) : isAuthenticated ? (
                <div className='flex items-center gap-3 group relative cursor-pointer'>
                    <User className='w-6 h-6' />
                    <div className="flex flex-col text-left leading-none gap-1">
                        <span className="text-xs font-medium opacity-80">Hello,</span>
                        <span className="text-sm font-bold truncate max-w-[100px]">{user?.name || user?.email?.split('@')[0]}</span>
                    </div>
                    <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                        <div className="bg-card border border-border rounded-lg shadow-xl py-2 min-w-[150px]">
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent font-medium transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative" ref={authRef}>
                    <button
                        onClick={() => setIsAuthOpen(!isAuthOpen)}
                        className='flex items-center gap-3 hover:scale-105 transition-transform outline-none'
                    >
                        <User className='w-6 h-6' />
                        <div className="flex flex-col text-left leading-none gap-1">
                            <span className="text-sm font-medium">Sign in</span>
                            <span className="text-sm font-bold">Account</span>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isAuthOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 mt-4 w-[280px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-50 overflow-hidden"
                            >
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/auth"
                                        className="w-full bg-[#0092FF] hover:bg-[#0070C6] text-white text-sm font-bold py-2.5 px-4 rounded-xl text-center transition-colors shadow-lg shadow-blue-500/20"
                                        onClick={() => setIsAuthOpen(false)}
                                    >
                                        Sign in or create account
                                    </Link>

                                    <div className="w-full h-px bg-gray-100 my-1" />

                                    <div className="space-y-1">
                                        <Link href="#" className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group" onClick={() => setIsAuthOpen(false)}>
                                            <History className="w-4 h-4 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Purchase History</span>
                                        </Link>

                                        <Link href="/shop" className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group" onClick={() => setIsAuthOpen(false)}>
                                            <Store className="w-4 h-4 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Mart</span>
                                        </Link>

                                        <Link href="#" className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group" onClick={() => setIsAuthOpen(false)}>
                                            <Award className="w-4 h-4 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Subscription</span>
                                        </Link>

                                        <button className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group text-left">
                                            <Globe className="w-4 h-4 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Language English</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Wallet Section */}
            <div className="relative" ref={walletRef}>
                <button
                    onClick={() => setIsWalletOpen(!isWalletOpen)}
                    className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform outline-none'
                >
                    <div className="flex flex-col items-center gap-1">
                        <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain" />
                        <span className="text-xs font-bold">$0.00</span>
                    </div>
                </button>

                <AnimatePresence>
                    {isWalletOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-4 w-[340px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-50 overflow-hidden"
                        >
                            <div className="bg-[#0092FF] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/30 mb-6">
                                <ShoppingCart className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 text-white/10 rotate-[-15deg]" />
                                <div className="relative z-10 space-y-6">
                                    <div>
                                        <h3 className="font-bold text-base">Watchlist</h3>
                                        <p className="text-[10px] text-blue-100 opacity-80 mt-1">Update 20/04/2025 at 04:40 PM</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium text-blue-100 opacity-80 mb-1 flex items-center gap-1.5">
                                            <Image src="/Wallet.png" alt="w" width={12} height={12} className="brightness-0 invert opacity-70" />
                                            Wallet Balance
                                        </p>
                                        <h2 className="text-3xl font-bold tracking-tight">$ 201,0231</h2>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/wallet"
                                className="w-full block bg-[#0092FF] hover:bg-[#0070C6] text-white text-center font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                                onClick={() => setIsWalletOpen(false)}
                            >
                                Go to Wallet
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Cart Section */}
            <div className="relative" ref={cartRef}>
                <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform outline-none'
                >
                    <div className="relative">
                        <ShoppingCart className='w-6 h-6' />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                    <span className="text-xs font-bold">${subtotal.toFixed(2)}</span>
                </button>

                <AnimatePresence>
                    {isCartOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-4 w-[360px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 overflow-hidden"
                        >
                            <h3 className="font-bold text-base mb-4 border-b border-gray-100 pb-3">Shopping Cart</h3>

                            {cartItems.length === 0 ? (
                                <div className="py-4 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                                        <ShoppingCart className="w-8 h-8 text-gray-200" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 mb-1">Your cart is empty</h4>
                                    <p className="text-xs text-gray-500 mb-4 max-w-[200px] mx-auto">Looks like you haven&apos;t added anything to your cart yet.</p>
                                    <Link
                                        href="/"
                                        onClick={() => setIsCartOpen(false)}
                                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#0092FF] hover:bg-[#0081E0] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                                        {cartItems.map((item) => (
                                            <div key={`${item.id}-${item.color || 'none'}-${item.size || 'none'}`} className="flex items-start gap-3 group">
                                                <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl relative shrink-0 p-1 flex items-center justify-center">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-gray-900 leading-tight mb-1 truncate px-1">{item.title}</p>
                                                    <div className="flex flex-col gap-1.5">
                                                        <p className="text-[10px] text-gray-400 font-medium uppercase">
                                                            {item.color && `${item.color}`}
                                                            {item.color && item.size && ` | `}
                                                            {item.size && `${item.size}`}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100 px-1 py-0.5">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                                                                    className="p-1 hover:text-[#0092FF] transition-colors"
                                                                    aria-label="Decrease quantity"
                                                                >
                                                                    <Minus className="w-2.5 h-2.5" />
                                                                </button>
                                                                <span className="text-[10px] font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                                                                    className="p-1 hover:text-[#0092FF] transition-colors"
                                                                    aria-label="Increase quantity"
                                                                >
                                                                    <Plus className="w-2.5 h-2.5" />
                                                                </button>
                                                            </div>
                                                            <span className="text-xs font-bold text-[#0092FF]">${(item.price * item.quantity).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id, item.color, item.size)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    title="Remove item"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mb-6 pt-3 border-t border-gray-100 border-dashed">
                                        <span className="text-sm font-medium text-gray-500">Sub-Total:</span>
                                        <span className="text-base font-bold text-gray-900">${subtotal.toFixed(2)} USD</span>
                                    </div>
                                    <div className="space-y-3">
                                        <Link
                                            href="/billing"
                                            className="w-full flex items-center justify-center gap-2 bg-[#0092FF] hover:bg-[#0070C6] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 group"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Checkout Now
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link
                                            href="/cart"
                                            className="w-full block bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-center font-bold py-3 px-4 rounded-xl transition-colors"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            View Cart
                                        </Link>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
