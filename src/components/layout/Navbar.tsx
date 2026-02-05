"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { pakFlag } from "@/assets/images";
import { motion, AnimatePresence } from "framer-motion";
import { RegionSelector } from "./RegionSelector";

const COUNTRIES = [
  { code: "PK", name: "Pakistan", flag: pakFlag },
  { code: "US", name: "United States", flag: pakFlag },
  { code: "UK", name: "United Kingdom", flag: pakFlag },
  { code: "AE", name: "UAE", flag: pakFlag },
  { code: "SA", name: "Saudi Arabia", flag: pakFlag },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMobileRegionOpen, setIsMobileRegionOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

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
            <button className='flex items-center gap-1 hover:opacity-80 transition-opacity font-medium'>
              <span>English</span>
              <ChevronDown className='w-3 h-3 md:w-4 md:h-4' />
            </button>
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
                <Image src="/Logo1.png" alt="Logo" width={160} height={48} className="h-10 w-auto object-contain" />
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
                  className='w-full bg-white border-none py-4 pl-14 pr-6 text-base focus:outline-none focus:ring-2 focus:ring-white/10 text-black shadow-lg shadow-black/5 rounded-[12px] placeholder:text-gray-400 font-medium'
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

              <Link href='/auth' className='flex items-center gap-3 hover:scale-105 transition-transform'>
                <User className='w-6 h-6' />
                <div className="flex flex-col text-left leading-none gap-1">
                  <span className="text-sm font-medium">Sign in</span>
                  <span className="text-sm font-bold">Account</span>
                </div>
              </Link>

              <Link href='/wallet' className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform'>
                <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-xs font-bold">$0.00</span>
              </Link>

              <Link href='/billing' className='flex flex-col items-center leading-none gap-1 hover:scale-110 transition-transform'>
                <ShoppingCart className='w-6 h-6' />
                <span className="text-xs font-bold">$0.00</span>
              </Link>
            </div>

            {/* Mobile Menu Buttons */}
            <div className='md:hidden flex items-center gap-3'>
              <button onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsMenuOpen(false); }} className='p-2.5 hover:bg-white/10 rounded-full'>
                <Search className='w-6 h-6' />
              </button>
              <Link href='/billing' className='p-2.5 hover:bg-white/10 rounded-full'>
                <ShoppingCart className='w-6 h-6' />
              </Link>
              <button onClick={() => { setIsMenuOpen(true); setIsMobileSearchOpen(false); }} className='p-2.5 hover:bg-white/10 rounded-full'>
                <Menu className='w-7 h-7' />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className='md:hidden bg-white border-b border-gray-100 overflow-hidden'
            >
              <div className='p-4'>
                <div className='relative'>
                  <input type='text' autoFocus placeholder='What are you looking for?' className='w-full bg-gray-50 border border-gray-200 py-3 pl-10 pr-4 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0092FF] text-black font-medium' />
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
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
              className='fixed inset-0 z-[60] bg-white md:hidden overflow-y-auto'
            >
              <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                <Link href='/' onClick={() => setIsMenuOpen(false)}>
                  <Image src="/Logo1.png" alt="Logo" width={120} height={36} className="h-8 w-auto object-contain brightness-0" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className='p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors'>
                  <X className='w-6 h-6' />
                </button>
              </div>

              <div className='p-6 space-y-8'>
                <Link href='/auth' className='flex items-center gap-4 px-5 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors' onClick={() => setIsMenuOpen(false)}>
                  <div className='w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center'>
                    <User className='w-6 h-6 text-gray-700' />
                  </div>
                  <div>
                    <p className='font-bold text-gray-900'>My Account</p>
                    <p className='text-xs text-gray-500'>Sign in or Register</p>
                  </div>
                </Link>

                <div className='flex flex-col gap-2'>
                  {['Home', 'Shop', 'About Us'].map((item) => (
                    <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className='px-4 py-3 text-lg font-bold text-gray-800 hover:bg-gray-50 rounded-xl transition-colors' onClick={() => setIsMenuOpen(false)}>
                      {item}
                    </Link>
                  ))}
                </div>

                <div className='pt-8 border-t border-gray-100'>
                  <p className='px-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest'>Preferences</p>
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
