"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
  SlidersHorizontal,
  List,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { pakFlag } from "@/assets/images";

const countries = [
  { code: "PK", name: "Pakistan", flag: pakFlag },
  { code: "US", name: "United States", flag: pakFlag },
  { code: "UK", name: "United Kingdom", flag: pakFlag },
  { code: "AE", name: "UAE", flag: pakFlag },
  { code: "SA", name: "Saudi Arabia", flag: pakFlag },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
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

  return (
    <div className='flex flex-col w-full z-50'>
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
      <nav className='bg-white border-b border-gray-200 sticky top-0'>
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

            {/* Region Selector with Dropdown */}
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
                    lineHeight: "18px",
                  }}
                >
                  Region
                </span>
                <ChevronDown className='w-4 h-4' style={{ color: "#666" }} />
              </button>

              {/* Region Dropdown */}
              {isRegionOpen && (
                <div className='absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[180px] z-50'>
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsRegionOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                        selectedCountry.code === country.code
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
                </div>
              )}
            </div>

            {/* Search Bar - Center */}
            <div className='hidden md:flex flex-1 max-w-xl mx-4'>
              <div className='relative w-full flex items-center'>
                <div className='absolute left-4' style={{ color: "#666" }}>
                  <Search className='w-5 h-5' color='#0091ff' />
                </div>
                <input
                  type='text'
                  placeholder='Search essentials, groceries and more...'
                  className='w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-[#0090FF] focus:border-transparent placeholder:text-gray-400 text-black'
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

            {/* Right Actions */}
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
                  lineHeight: "18px",
                }}
              >
                <User className='w-5 h-5 text-primary' />
                <span>Sign Up/Sign In</span>
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-gray-300'></div>

              {/* Cart */}
              <Link
                href='/cart'
                className='flex items-center gap-2 hover:opacity-80 transition-opacity'
                style={{
                  color: "#666",
                  fontFamily: "var(--font-readex-pro)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "18px",
                }}
              >
                <ShoppingCart className='w-5 h-5 text-primary' />
                <span>Cart</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center gap-4'>
              <button className='p-2' style={{ color: "#666" }}>
                <Search className='w-5 h-5 text-primary' />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='p-2'
                style={{ color: "#666" }}
              >
                {isMenuOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-50 shadow-lg'>
            <div className='px-4 py-6 space-y-4'>
              {/* Mobile Search */}
              <div className='relative w-full mb-6'>
                <input
                  type='text'
                  placeholder='Search essentials, groceries and more...'
                  className='w-full bg-gray-100 py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0090FF] text-black'
                  style={{ borderRadius: "10px" }}
                />
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                  style={{ color: "#666" }}
                >
                  <Search className='w-5 h-5 text-primary' />
                </button>
              </div>

              <div className='space-y-3'>
                <Link
                  href='/auth'
                  className='flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md'
                  style={{ color: "#666" }}
                >
                  <User className='w-5 h-5' />
                  <span>Sign Up/Sign In</span>
                </Link>
                <Link
                  href='/cart'
                  className='flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md'
                  style={{ color: "#666" }}
                >
                  <ShoppingCart className='w-5 h-5' />
                  <span>Cart</span>
                </Link>
                <button
                  className='flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md w-full text-left'
                  style={{ color: "#666" }}
                >
                  <div className='w-6 h-4 relative overflow-hidden rounded-sm'>
                    <Image
                      src={pakFlag}
                      alt='Flag'
                      className='object-cover'
                      fill
                    />
                  </div>
                  <span>Region</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
