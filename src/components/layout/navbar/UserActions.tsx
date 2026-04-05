"use client";

import Link from "next/link";
import Image from "next/image";
import { User as UserIcon, ShoppingCart, History, Store, Award, Globe, ArrowRight, X, Minus, Plus, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSelector, Language } from "../LanguageSelector";
import { User, WalletData } from "@/lib/auth-context";
import { useCartStore, useCartSubtotal } from "@/lib/store/cartStore";
import { useConfigStore } from "@/lib/store/configStore";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface UserActionsProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    logout: () => void;
    isAuthOpen: boolean;
    setIsAuthOpen: (isOpen: boolean) => void;
    isWalletOpen: boolean;
    setIsWalletOpen: (isOpen: boolean) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isLangOpen: boolean;
    setIsLangOpen: (isOpen: boolean) => void;
    selectedLang: Language;
    setSelectedLang: (lang: Language) => void;
    langRef: React.RefObject<HTMLDivElement | null>;
    authRef: React.RefObject<HTMLDivElement | null>;
    walletRef: React.RefObject<HTMLDivElement | null>;
    cartRef: React.RefObject<HTMLDivElement | null>;
    wallet: WalletData | null;
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
    isLangOpen,
    setIsLangOpen,
    selectedLang,
    setSelectedLang,
    langRef,
    authRef,
    walletRef,
    cartRef,
    wallet,
}: UserActionsProps) {
    const cartItems = useCartStore((state) => state.items);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const subtotal = useCartSubtotal();
    const { activeCategoryId } = useConfigStore();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [fetchCart, isAuthenticated]);

    return (
        <div className='hidden md:flex items-center gap-6'>
            {/* Language Selector */}
            <div ref={langRef}>
                <LanguageSelector
                    isOpen={isLangOpen}
                    setIsOpen={setIsLangOpen}
                    selectedLang={selectedLang}
                    onSelect={setSelectedLang}
                />
            </div>

            {/* Account Section */}
            {isLoading ? (
                <div className="w-28 h-8 bg-white/10 animate-pulse rounded-full" />
            ) : isAuthenticated ? (
                <div className="relative" ref={authRef}>
                    <button
                        onClick={() => setIsAuthOpen(!isAuthOpen)}
                        className='flex items-center gap-3 hover:scale-105 transition-transform outline-none'
                    >
                        <UserIcon className='w-6 h-6' />
                        <div className="flex flex-col text-left leading-none gap-1">
                            <span className="text-xs font-medium opacity-80">Hello,</span>
                            <span className="text-sm font-bold truncate max-w-[100px]">{user?.firstName || user?.email?.split('@')[0]}</span>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isAuthOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 mt-4 w-[250px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[100] overflow-hidden"
                            >
                                <div className="flex flex-col gap-2">
                                    {/* User info header */}
                                    <Link
                                        href="/account/personal-data"
                                        onClick={() => setIsAuthOpen(false)}
                                        className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#0092FF] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                            {(user?.firstName || user?.fullName || user?.email)?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{user?.firstName || user?.fullName || user?.email?.split('@')[0]}</p>
                                            <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                                        </div>
                                    </Link>

                                    <div className="w-full h-px bg-gray-100" />

                                    <div className="space-y-0.5">
                                        <Link
                                            href="/account/orders"
                                            className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                            onClick={() => setIsAuthOpen(false)}
                                        >
                                            <History className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Purchase History</span>
                                        </Link>

                                        <Link
                                            href={activeCategoryId ? `/category/${activeCategoryId}` : "/"}
                                            className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                            onClick={() => setIsAuthOpen(false)}
                                        >
                                            <Store className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Mart</span>
                                        </Link>

                                        <Link
                                            href="/account/subscription"
                                            className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                            onClick={() => setIsAuthOpen(false)}
                                        >
                                            <Award className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Subscription</span>
                                        </Link>
                                    </div>

                                    <div className="w-full h-px bg-gray-100" />

                                    <button
                                        onClick={() => { logout(); setIsAuthOpen(false); }}
                                        className="w-full flex items-center gap-2.5 p-2 hover:bg-red-50 rounded-xl transition-colors group text-left"
                                    >
                                        <LogOut className="w-3.5 h-3.5 text-red-400 group-hover:text-red-500 transition-colors" />
                                        <span className="text-sm font-medium text-red-500 group-hover:text-red-600 transition-colors">Sign Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="relative" ref={authRef}>
                    <button
                        onClick={() => setIsAuthOpen(!isAuthOpen)}
                        className='flex items-center gap-3 hover:scale-105 transition-transform outline-none'
                    >
                        <UserIcon className='w-6 h-6' />
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
                                className="absolute top-full right-0 mt-4 w-[250px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden"
                            >
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/auth"
                                        className="w-full bg-[#0092FF] hover:bg-[#0070C6] text-white text-sm font-bold py-2 px-4 rounded-xl text-center transition-colors shadow-lg shadow-blue-500/20"
                                        onClick={() => setIsAuthOpen(false)}
                                    >
                                        Sign in or create account
                                    </Link>

                                    <div className="w-full h-px bg-gray-100 my-1" />

                                    <div className="space-y-0.5">
                                        <Link
                                            href={isAuthenticated ? "/account/orders" : "/auth"}
                                            className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                            onClick={() => setIsAuthOpen(false)}
                                        >
                                            <History className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Purchase History</span>
                                        </Link>

                                        <Link
                                            href={activeCategoryId ? `/category/${activeCategoryId}` : "/"}
                                            className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                            onClick={() => setIsAuthOpen(false)}
                                        >
                                            <Store className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Mart</span>
                                        </Link>

                                        <Link
                                            href={isAuthenticated ? "/account/subscription" : "/auth"}
                                            className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                                            onClick={() => setIsAuthOpen(false)}
                                        >
                                            <Award className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Subscription</span>
                                        </Link>
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
                        <span className="text-xs font-bold">
                            {isAuthenticated && wallet ? `${wallet.currency.shortCode} ${wallet.currentBalance.toLocaleString()}` : "$0.00"}
                        </span>
                    </div>
                </button>

                <AnimatePresence>
                    {isWalletOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-4 w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[100] overflow-hidden"
                        >
                            <div className={`bg-[#0092FF] rounded-2xl p-5 text-white relative overflow-hidden shadow-lg shadow-blue-500/30 ${isAuthenticated ? 'mb-5' : ''}`}>
                                <ShoppingCart className="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-28 text-white/10 rotate-[-15deg]" />
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
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-bold tracking-tight">
                                                {isAuthenticated && wallet ? `${wallet.currency.shortCode} ${wallet.currentBalance.toLocaleString()}` : (
                                                    <span className="opacity-30 tracking-tighter">$ 0.00</span>
                                                )}
                                            </h2>
                                            {!isAuthenticated && (
                                                <Link
                                                    href="/auth"
                                                    onClick={() => setIsWalletOpen(false)}
                                                    className="text-[11px] font-bold text-white border border-white/20 bg-white/10 w-fit px-3 py-1 rounded-full hover:bg-white/20 transition-all text-left mt-1 inline-block"
                                                >
                                                    Sign in to check balance
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isAuthenticated && (
                                <Link
                                    href="/wallet"
                                    className="w-full block bg-[#0092FF] hover:bg-[#0070C6] text-white text-center font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                                    onClick={() => setIsWalletOpen(false)}
                                >
                                    Go to Wallet
                                </Link>
                            )}
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
                            className="absolute top-full right-0 mt-4 w-[360px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-[100] overflow-hidden"
                        >
                            {cartItems.length === 0 ? (
                                <div className="py-4 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                                        <ShoppingCart className="w-8 h-8 text-gray-200" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 mb-1">Your cart is empty</h4>
                                    <p className="text-xs text-gray-500 mb-4 max-w-[200px] mx-auto">Looks like you haven&apos;t added anything to your cart yet.</p>
                                    <Link
                                        href={activeCategoryId ? `/category/${activeCategoryId}` : "/"}
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
                                            <div key={`${item.id}-${item.color || 'none'}-${item.size || 'none'}`} 
                                                className={cn(
                                                    "flex items-start gap-3 group relative p-1 transition-opacity",
                                                    item.isUpdating && "opacity-60 pointer-events-none"
                                                )}
                                            >
                                                <div className="w-14 h-14 bg-white border border-gray-100 rounded-lg relative shrink-0 p-1 flex items-center justify-center">
                                                    <Image
                                                        src={typeof item.image === 'string' ? item.image : '/images/placeholder.png'}
                                                        alt={item.title}
                                                        width={40}
                                                        height={40}
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
                                                                    disabled={item.isUpdating}
                                                                    className="p-1 hover:text-[#0092FF] transition-colors disabled:opacity-30"
                                                                    aria-label="Decrease quantity"
                                                                >
                                                                    <Minus className="w-2.5 h-2.5" />
                                                                </button>
                                                                <span className="text-[10px] font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                                                                    disabled={item.isUpdating}
                                                                    className="p-1 hover:text-[#0092FF] transition-colors disabled:opacity-30"
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
                                                    disabled={item.isUpdating}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1 disabled:opacity-30"
                                                    title="Remove item"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                {item.isUpdating && (
                                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20 rounded-lg">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0092FF]"></div>
                                                    </div>
                                                )}
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
