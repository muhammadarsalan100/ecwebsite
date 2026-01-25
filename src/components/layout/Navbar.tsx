"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
  List,
  Globe,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { pakFlag } from "@/assets/images";
import { motion, AnimatePresence } from "framer-motion";

const countries = [
  { code: "PK", name: "Pakistan", flag: pakFlag },
  { code: "US", name: "United States", flag: pakFlag },
  { code: "UK", name: "United Kingdom", flag: pakFlag },
  { code: "AE", name: "UAE", flag: pakFlag },
  { code: "SA", name: "Saudi Arabia", flag: pakFlag },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false); // Desktop Region
  const [isMobileRegionOpen, setIsMobileRegionOpen] = useState(false); // Mobile Region
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const regionRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      ) {
        setIsRegionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <div className='flex flex-col w-full z-50 relative'>
      {/* Top Bar */}
      <div className='bg-black text-white text-xs py-3 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0'>
          <div className='hidden md:block w-1/4'></div>
          <div className='flex-1 text-center'>
            <span className='opacity-90'>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!{" "}
            </span>
            <Link
              href='/shop'
              className='font-bold underline ml-2 hover:text-gray-300 transition-colors'
            >
              ShopNow
            </Link>
          </div>
          <div className='w-auto md:w-1/4 flex justify-center md:justify-end'>
            <button className='flex items-center gap-1 hover:opacity-80 transition-opacity'>
              <span>English</span>
              <ChevronDown className='w-3 h-3 md:w-4 md:h-4' />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20 gap-4'>
            {/* Logo */}
            <div className='shrink-0'>
              <Link
                href='/'
                className='text-2xl font-bold tracking-tight text-black'
              >
                Logo
              </Link>
            </div>

            {/* Desktop: Region Selector */}
            <div
              className='hidden md:flex items-center relative'
              ref={regionRef}
            >
              <button
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className='flex items-center gap-2 hover:opacity-80 transition-opacity'
              >
                <div className='w-5 h-4 relative overflow-hidden rounded-sm shrink-0'>
                  <Image
                    src={selectedCountry.flag}
                    alt='Flag'
                    fill
                    className='object-cover'
                  />
                </div>
                <span
                  style={{
                    color: "#666",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                >
                  Region
                </span>
                <ChevronDown className='w-4 h-4' style={{ color: "#666" }} />
              </button>

              {/* Region Dropdown */}
              <AnimatePresence>
                {isRegionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[180px] z-50'
                  >
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsRegionOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${selectedCountry.code === country.code
                          ? "bg-gray-50"
                          : ""
                          }`}
                      >
                        <div className='w-5 h-4 relative overflow-hidden rounded-sm shrink-0'>
                          <Image
                            src={country.flag}
                            alt={country.name}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <span className='text-sm text-gray-700'>
                          {country.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop: Search Bar */}
            <div className='hidden md:flex flex-1 max-w-xl mx-4'>
              <div className='relative w-full flex items-center'>
                <div className='absolute left-4' style={{ color: "#666" }}>
                  <Search className='w-5 h-5' color='#0092FF' />
                </div>
                <input
                  type='text'
                  placeholder='Search essentials, groceries and more...'
                  className='w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-[#0092FF] focus:border-transparent placeholder:text-gray-400 text-black'
                  style={{ borderRadius: "10px" }}
                />
                <button
                  className='absolute right-3 p-1'
                  style={{ color: "#666" }}
                >
                  <List className='w-5 h-5 text-primary' />
                </button>
              </div>
            </div>

            {/* Desktop: Right Actions */}
            <div className='hidden md:flex items-center gap-6'>
              {/* Sign Up/Sign In */}
              <Link
                href='/auth'
                className='flex items-center gap-2 hover:opacity-80 transition-opacity'
                style={{
                  color: "#666",
                  fontFamily: "var(--font-readex-pro)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                <User className='w-5 h-5 text-primary' />
                <span>Sign Up/Sign In</span>
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-gray-300'></div>

              {/* Cart */}
              <Link
                href='/billing'
                className='flex items-center gap-2 hover:opacity-80 transition-opacity'
                style={{
                  color: "#666",
                  fontFamily: "var(--font-readex-pro)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                <ShoppingCart className='w-5 h-5 text-primary' />
                <span>Cart</span>
              </Link>
            </div>

            {/* Mobile Actions - Keep new responsive design */}
            <div className='md:hidden flex items-center gap-2'>
              <button
                onClick={() => {
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                  setIsMenuOpen(false);
                }}
                className='p-2 text-gray-600'
              >
                <Search className='w-5 h-5' />
              </button>

              <Link href='/billing' className='p-2 text-gray-600 relative'>
                <ShoppingCart className='w-5 h-5' />
                {/* <span className="absolute top-1 right-0 bg-[var(--primary)] text-white text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span> */}
              </Link>

              <button
                onClick={() => {
                  setIsMenuOpen(true);
                  setIsMobileSearchOpen(false);
                }}
                className='p-2 text-gray-600'
              >
                <Menu className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='md:hidden bg-white border-b border-gray-100 overflow-hidden'
            >
              <div className='p-4'>
                <div className='relative'>
                  <input
                    type='text'
                    autoFocus
                    placeholder='What are you looking for?'
                    className='w-full bg-gray-50 border border-gray-200 py-3 pl-10 pr-4 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-black'
                  />
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay - Full Screen */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className='fixed inset-0 z-[60] bg-white md:hidden overflow-y-auto'
            >
              {/* Internal Header for Mobile Menu */}
              <div className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100'>
                <div className='shrink-0'>
                  <Link
                    href='/'
                    className='text-xl font-bold tracking-tight text-black'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logo
                  </Link>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className='p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>

              <div className='p-4 space-y-2'>
                <div className='space-y-2 pb-6 border-b border-gray-100'>
                  <Link
                    href='/auth'
                    className='flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className='p-2 bg-white rounded-full shadow-sm'>
                      <User className='w-5 h-5 text-gray-700' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900'>My Account</p>
                      <p className='text-xs text-gray-500'>
                        Sign in or Register
                      </p>
                    </div>
                  </Link>
                </div>

                <div className='space-y-1 pt-4'>
                  <Link
                    href='/'
                    className='flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Home</span>
                  </Link>
                  <Link
                    href='/shop'
                    className='flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Shop</span>
                  </Link>
                  <Link
                    href='/about'
                    className='flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>About Us</span>
                  </Link>
                </div>

                <div className='pt-4 mt-4 border-t border-gray-100'>
                  <div className='px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Preferences
                  </div>

                  {/* Mobile Region Selector */}
                  <div className='rounded-xl overflow-hidden border border-gray-100'>
                    <button
                      onClick={() => setIsMobileRegionOpen(!isMobileRegionOpen)}
                      className='w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors'
                    >
                      <div className='flex items-center gap-3'>
                        <Globe className='w-4 h-4 text-gray-500' />
                        <span className='text-sm font-medium text-gray-700'>
                          Region
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-5 h-4 relative overflow-hidden rounded-sm shadow-sm'>
                          <Image
                            src={selectedCountry.flag}
                            alt='Flag'
                            fill
                            className='object-cover'
                          />
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${isMobileRegionOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isMobileRegionOpen && (
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
                                setIsMobileRegionOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-11 py-2.5 transition-colors text-left text-sm ${selectedCountry.code === country.code
                                ? "text-[var(--primary)] font-medium bg-blue-50/50"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                              <div className='w-5 h-4 relative overflow-hidden rounded-sm shrink-0 shadow-sm'>
                                <Image
                                  src={country.flag}
                                  alt={country.name}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                              <span>{country.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
