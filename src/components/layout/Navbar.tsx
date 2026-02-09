"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
  Home,
  Store,
  ShieldCheck,
  LogOut,
  Truck,
  MapPin,
  Package,
  History,
  Globe,
  Award,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/lib/auth-context";
import { pakFlag } from "@/assets/images";
import { RegionSelector } from "./RegionSelector";
import { LanguageSelector, LANGUAGES, Language } from "./LanguageSelector";

const COUNTRIES = [
  { code: "PK", name: "Pakistan", flag: pakFlag },
  { code: "US", name: "United States", flag: "/USAFlag.png" },
  { code: "IN", name: "India", flag: "/INDFlag.png" },
  { code: "UK", name: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
  { code: "AE", name: "UAE", flag: "https://flagcdn.com/w80/ae.png" },
  { code: "SA", name: "Saudi Arabia", flag: "https://flagcdn.com/w80/sa.png" },
];

export default function Navbar() {
  // State Hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMobileRegionOpen, setIsMobileRegionOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);

  // Ref Hooks
  const regionRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);


  const locationRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Custom Hooks
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Effect Hooks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (authRef.current && !authRef.current.contains(event.target as Node)) {
        setIsAuthOpen(false);
      }
      if (walletRef.current && !walletRef.current.contains(event.target as Node)) {
        setIsWalletOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // Navigation Handlers
  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      router.push(path);
    }
  };

  return (
    <div className='flex flex-col w-full z-50 relative font-poppins'>
      {/* Top Bar */}
      <div className='bg-black text-white text-xs py-3'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0'>
          <div className='hidden md:block w-1/4'></div>
          <div className='flex-1 text-center font-medium'>
            <span className='opacity-90'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
            <Link href='/shop' className='font-bold underline ml-2 hover:text-blue-400 transition-colors'>ShopNow</Link>
          </div>
          <div className='w-auto md:w-1/4 flex justify-center md:justify-end'>
            <div ref={langRef}>
              <LanguageSelector
                isOpen={isLangOpen}
                setIsOpen={setIsLangOpen}
                selectedLang={selectedLang}
                onSelect={setSelectedLang}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className='bg-[#0092FF] text-white sticky top-0 z-40 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-24 gap-6'>
            {/* Logo & Location */}
            <div className='shrink-0 flex items-center gap-8'>
              <Link href='/' className='flex items-center gap-2 text-2xl font-bold tracking-tight'>
                <Image src="/Logo1.png" alt="Logo" width={160} height={48} className="h-10 w-auto object-contain" priority style={{ height: '40px', width: 'auto' }} />
              </Link>

              <div className="relative" ref={locationRef}>
                <div
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="hidden lg:flex items-center gap-3 bg-[#0080E3] rounded-2xl px-4 py-2 w-[260px] transition-all hover:bg-[#0070C6] cursor-pointer group select-none"
                >
                  <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                    <Image src="/Ellipse.png" alt="Icon bg" fill className="object-contain" />
                    <Image src="/Saleperson.png" alt="Salesperson" width={16} height={16} className="relative z-10 object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs opacity-80">Pickup or delivery?</span>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <span className="truncate max-w-[160px]">Sacramento, 78342...</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Location Dropdown Modal */}
                <AnimatePresence>
                  {isLocationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-50 overflow-hidden"
                    >
                      {/* Top Options */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <button className="flex flex-col items-center gap-1 group/btn">
                          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-blue-50 group-hover/btn:border-blue-100 transition-colors">
                            <Truck className="w-4 h-4 text-gray-600 group-hover/btn:text-[#0092FF]" />
                          </div>
                          <span className="text-[9px] font-bold text-gray-600 group-hover/btn:text-[#0092FF]">Shipping</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group/btn">
                          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-blue-50 group-hover/btn:border-blue-100 transition-colors">
                            <MapPin className="w-4 h-4 text-gray-600 group-hover/btn:text-[#0092FF]" />
                          </div>
                          <span className="text-[9px] font-bold text-gray-600 group-hover/btn:text-[#0092FF]">Pickup</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group/btn">
                          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-blue-50 group-hover/btn:border-blue-100 transition-colors">
                            <Package className="w-4 h-4 text-gray-600 group-hover/btn:text-[#0092FF]" />
                          </div>
                          <span className="text-[9px] font-bold text-gray-600 group-hover/btn:text-[#0092FF]">Delivery</span>
                        </button>
                      </div>

                      {/* Add Address Section */}
                      <div className="space-y-3">
                        <div className="p-3 border border-blue-100 bg-blue-50/30 rounded-2xl flex gap-3 transition-colors hover:border-blue-200">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-[#0092FF]" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <p className="text-xs font-bold text-gray-900 leading-tight">Add an Address for Shipping and Delivery</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">Sacramento, CA 97435</p>
                            </div>
                            <button className="w-full bg-[#0092FF] hover:bg-[#0070C6] text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                              Add address
                            </button>
                          </div>
                        </div>

                        {/* Existing Address / Other Option */}
                        <div className="p-3 border border-gray-100 hover:border-blue-100 rounded-2xl flex items-center gap-3 cursor-pointer transition-all hover:bg-gray-50 group">
                          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
                            <Home className="w-4 h-4 text-gray-500 group-hover:text-[#0092FF]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-gray-900 leading-tight">Add an Address for Shipping and Delivery</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Sacramento, CA 97435</p>
                          </div>
                          <ChevronDown className="w-3 h-3 text-gray-400 -rotate-90" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Search */}
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

            {/* Desktop Actions */}
            <div className='hidden md:flex items-center gap-8'>
              <div ref={regionRef}>
                <RegionSelector
                  isOpen={isRegionOpen}
                  setIsOpen={setIsRegionOpen}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  countries={COUNTRIES}
                />
              </div>

              {isLoading ? (
                <div className="w-28 h-8 bg-white/10 animate-pulse rounded-full" />
              ) : isAuthenticated ? (
                <div className='flex items-center gap-3 group relative cursor-pointer'>
                  <User className='w-6 h-6' />
                  <div className="flex flex-col text-left leading-none gap-1">
                    <span className="text-xs font-medium opacity-80">Hello,</span>
                    <span className="text-sm font-bold truncate max-w-[100px]">{user?.split('@')[0]}</span>
                  </div>
                  {/* Dropdown for Sign Out */}
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
                          >
                            Sign in or create account
                          </Link>

                          <div className="w-full h-px bg-gray-100 my-1" />

                          <div className="space-y-1">
                            <Link href="#" className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group">
                              <History className="w-4 h-4 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Purchase History</span>
                            </Link>

                            <Link href="/shop" className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group">
                              <Store className="w-4 h-4 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Mart</span>
                            </Link>

                            <Link href="#" className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors group">
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
                      {/* Wallet Card */}
                      <div className="bg-[#0092FF] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/30 mb-6">
                        {/* Faint Cart Background */}
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

                      {/* Action Button */}
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

              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform outline-none'
                >
                  <ShoppingCart className='w-6 h-6' />
                  <span className="text-xs font-bold">$0.00</span>
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

                      {/* Cart Items */}
                      <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                        {/* Item 1 */}
                        <div className="flex items-start gap-3 group">
                          <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl relative shrink-0 p-1 flex items-center justify-center">
                            <Image src="/cartItem.png" alt="Camera" width={48} height={48} className="object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 leading-tight mb-1 truncate px-1">Canon EOS 1500D DSLR Camera + 18-55 mm</p>
                            <p className="text-xs font-medium text-gray-500">1 x <span className="text-[#0092FF] font-bold">$1,500</span></p>
                          </div>
                          <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Item 2 */}
                        <div className="flex items-start gap-3 group">
                          <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl relative shrink-0 p-1 flex items-center justify-center">
                            <Image src="/cartItem1.png" alt="Headphone" width={48} height={48} className="object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 leading-tight mb-1 truncate px-1">Simple Mobile 5G LTE Galaxy 12Mini 512GB</p>
                            <p className="text-xs font-medium text-gray-500">1 x <span className="text-[#0092FF] font-bold">$1,500</span></p>
                          </div>
                          <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Sub-Total */}
                      <div className="flex items-center justify-between mb-6 pt-3 border-t border-gray-100 border-dashed">
                        <span className="text-sm font-medium text-gray-500">Sub-Total:</span>
                        <span className="text-base font-bold text-gray-900">$2038.00 USD</span>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <Link
                          href="/checkout"
                          className="w-full flex items-center justify-center gap-2 bg-[#0092FF] hover:bg-[#0070C6] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 group"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Checkout Now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          href="/billing"
                          className="w-full block bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-center font-bold py-3 px-4 rounded-xl transition-colors"
                          onClick={() => setIsCartOpen(false)}
                        >
                          View Cart
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Buttons */}
            <div className='md:hidden flex items-center gap-5'>
              <button
                onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsMenuOpen(false); }}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <Search className='w-6 h-6' />
                <span className="text-[10px] font-bold">Search</span>
              </button>

              <Link
                href='/wallet'
                onClick={(e) => handleProtectedNavigation(e, '/wallet')}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-[10px] font-bold">$0.00</span>
              </Link>

              <Link
                href='/billing'
                onClick={(e) => handleProtectedNavigation(e, '/billing')}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <ShoppingCart className='w-6 h-6' />
                <span className="text-[10px] font-bold">$0.00</span>
              </Link>

              <button
                onClick={() => { setIsMenuOpen(true); setIsMobileSearchOpen(false); }}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <Menu className='w-7 h-7' />
                <span className="text-[10px] font-bold">Menu</span>
              </button>
            </div>
          </div >
        </div >

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className='fixed inset-0 z-[60] bg-white md:hidden overflow-y-auto flex flex-col'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-6 py-5 bg-[#0092FF] text-white shadow-md shrink-0 sticky top-0 z-50'>
                <Link href='/' onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
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
                  onClick={() => setIsMenuOpen(false)}
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
                        {user?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className='text-[10px] font-bold text-[#0092FF] mb-1 uppercase tracking-widest'>Welcome Back</p>
                        <p className='font-bold text-gray-900 truncate text-lg leading-tight'>{user?.split('@')[0]}</p>
                        <p className='text-xs text-gray-400 truncate mt-0.5'>{user}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/wallet"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-3 p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 rounded-3xl transition-all group"
                      >
                        <div className="w-12 h-12 bg-[#0092FF] rounded-full shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform flex items-center justify-center">
                          <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain brightness-0 invert" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#0092FF] transition-colors">Wallet</span>
                      </Link>
                      <Link
                        href="/billing"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-3 p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 rounded-3xl transition-all group"
                      >
                        <div className="w-12 h-12 bg-[#0092FF] rounded-full shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#0092FF] transition-colors">Cart</span>
                      </Link>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
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
                        onClick={() => setIsMenuOpen(false)}
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
                    onClick={() => setIsMenuOpen(false)}
                    className='flex items-center gap-4 px-4 py-3.5 text-base font-bold text-gray-700 hover:text-[#0092FF] hover:bg-blue-50 rounded-xl transition-all group'
                  >
                    <Home className="w-5 h-5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                    Home
                  </Link>

                  <Link
                    href="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className='flex items-center gap-4 px-4 py-3.5 text-base font-bold text-gray-700 hover:text-[#0092FF] hover:bg-blue-50 rounded-xl transition-all group'
                  >
                    <Store className="w-5 h-5 text-gray-400 group-hover:text-[#0092FF] transition-colors" />
                    Shop
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
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
                    countries={COUNTRIES}
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
        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-blue-400/30 bg-[#0092FF] overflow-hidden"
            >
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
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="p-2 mr-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav >
    </div >
  );
}
