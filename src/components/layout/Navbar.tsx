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

  // Custom Hooks
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  // Effect Hooks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
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

              <div className="hidden lg:flex items-center gap-3 bg-[#0080E3] rounded-2xl px-4 py-2 min-w-[220px] transition-all hover:bg-[#0070C6] cursor-pointer group">
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <Image src="/Ellipse.png" alt="Icon bg" fill className="object-contain" />
                  <Image src="/Saleperson.png" alt="Salesperson" width={16} height={16} className="relative z-10 object-contain" unoptimized />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs opacity-80">Pickup or delivery?</span>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <span className="truncate max-w-[160px]">Sacramento, 78342...</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  </div>
                </div>
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
                  <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[150px] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 z-50">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link href='/auth' className='flex items-center gap-3 hover:scale-105 transition-transform'>
                  <User className='w-6 h-6' />
                  <div className="flex flex-col text-left leading-none gap-1">
                    <span className="text-sm font-medium">Sign in</span>
                    <span className="text-sm font-bold">Account</span>
                  </div>
                </Link>
              )}

              <Link
                href='/wallet'
                onClick={(e) => handleProtectedNavigation(e, '/wallet')}
                className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform'
              >
                <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-xs font-bold">$0.00</span>
              </Link>

              <Link
                href='/billing'
                onClick={(e) => handleProtectedNavigation(e, '/billing')}
                className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform'
              >
                <ShoppingCart className='w-6 h-6' />
                <span className="text-xs font-bold">$0.00</span>
              </Link>
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
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className='md:hidden bg-background border-b border-border overflow-hidden'
            >
              <div className='p-4'>
                <div className='relative'>
                  <input type='text' autoFocus placeholder='What are you looking for?' className='w-full bg-card border border-border py-3 pl-10 pr-4 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium placeholder:text-muted-foreground' />
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Full Screen */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className='fixed inset-0 z-[60] bg-background md:hidden overflow-y-auto'
            >
              <div className='flex items-center justify-between px-6 py-4 border-b border-border'>
                <Link href='/' onClick={() => setIsMenuOpen(false)}>
                  <Image src="/Logo1.png" alt="Logo" width={120} height={36} className="h-8 w-auto object-contain dark:invert" priority style={{ height: '32px', width: 'auto' }} />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className='p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors'>
                  <X className='w-6 h-6' />
                </button>
              </div>

              <div className='p-6 space-y-8'>
                {isLoading ? (
                  <div className="flex items-center gap-4 px-5 py-4 bg-muted rounded-2xl animate-pulse">
                    <div className="w-12 h-12 bg-gray-200/20 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200/20 rounded w-24" />
                      <div className="h-3 bg-gray-200/20 rounded w-32" />
                    </div>
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-3">
                    <div className='flex items-center gap-4 px-5 py-4 bg-card border border-border rounded-2xl'>
                      <div className='w-12 h-12 bg-background rounded-full shadow-sm flex items-center justify-center shrink-0'>
                        <User className='w-6 h-6 text-foreground' />
                      </div>
                      <div className="min-w-0">
                        <p className='font-bold text-foreground truncate'>Hello, {user?.split('@')[0]}</p>
                        <p className='text-xs text-muted-foreground truncate'>{user}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-5 py-4 text-sm font-bold text-red-600 bg-red-50/10 rounded-2xl hover:bg-red-100/20 transition-colors flex items-center gap-3"
                    >
                      <X className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link href='/auth' className='flex items-center gap-4 px-5 py-4 bg-card border border-border rounded-2xl hover:bg-accent transition-colors' onClick={() => setIsMenuOpen(false)}>
                    <div className='w-12 h-12 bg-background rounded-full shadow-sm flex items-center justify-center'>
                      <User className='w-6 h-6 text-foreground' />
                    </div>
                    <div>
                      <p className='font-bold text-foreground'>My Account</p>
                      <p className='text-xs text-muted-foreground'>Sign in or Register</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-2'>
                  {['Home', 'Shop', 'About Us'].map((item) => (
                    <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className='px-4 py-3 text-lg font-bold text-foreground hover:bg-accent rounded-xl transition-colors' onClick={() => setIsMenuOpen(false)}>
                      {item}
                    </Link>
                  ))}
                </div>

                <div className='pt-8 border-t border-border'>
                  <p className='px-4 mb-4 text-xs font-bold text-muted-foreground uppercase tracking-widest'>Preferences</p>
                  <RegionSelector
                    isOpen={isMobileRegionOpen}
                    setIsOpen={setIsMobileRegionOpen}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    countries={COUNTRIES}
                    isMobile
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
