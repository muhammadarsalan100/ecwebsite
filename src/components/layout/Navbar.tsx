"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { pakFlag } from "@/assets/images";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex flex-col w-full z-50'>
      {/* Top Bar */}
      <div className='bg-black text-white text-xs py-3 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0'>
          <div className='hidden md:block w-1/4'></div>{" "}
          {/* Spacer for centering */}
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
                Name Logo
              </Link>
            </div>

            {/* Desktop Navigation - Middle (Optional based on image, but good to keep links if needed, otherwise hidden) 
                The image doesn't strictly show links in the middle, but standard navs usually have them. 
                Based on "Name Logo" image, it seems strictly Logo | Search | Actions. 
                I will prioritize the layout in the image but keep the search prominent.
            */}

            {/* Search Bar - Center/Right aligned */}
            <div className='hidden md:flex flex-1 max-w-md mx-8'>
              <div className='relative w-full'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='w-full bg-gray-100 rounded-md py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-500 text-black'
                />
                <button className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black'>
                  <Search className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className='hidden md:flex items-center space-x-6 text-black'>
              {/* Region Selector */}
              <button className='flex items-center gap-2 hover:opacity-80 transition-opacity text-sm font-medium'>
                <div className='w-6 h-4 relative overflow-hidden rounded-sm border border-gray-200'>
                  <Image
                    src={pakFlag}
                    alt='Flag'
                    className='w-full h-full object-cover'
                  />
                </div>
                <span>Region</span>
                <ChevronDown className='w-4 h-4' />
              </button>

              <Link
                href='/wishlist'
                className='hover:text-secondary transition-colors'
              >
                <Heart className='w-6 h-6' />
              </Link>

              <Link
                href='/cart'
                className='hover:text-secondary transition-colors relative'
              >
                <ShoppingCart className='w-6 h-6' />
                {/* Optional Badge */}
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span> */}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center gap-4'>
              <button className='text-black p-2'>
                <Search className='w-5 h-5' />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-black p-2'
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
          <div className='md:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-50 shadow-lg text-black'>
            <div className='px-4 py-6 space-y-4'>
              {/* Mobile Search */}
              <div className='relative w-full mb-6'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='w-full bg-gray-100 rounded-md py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-black text-black'
                />
                <button className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
                  <Search className='w-5 h-5' />
                </button>
              </div>

              <div className='space-y-3'>
                <Link
                  href='/wishlist'
                  className='flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md'
                >
                  <Heart className='w-5 h-5' />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href='/cart'
                  className='flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md'
                >
                  <ShoppingCart className='w-5 h-5' />
                  <span>Cart</span>
                </Link>
                <button className='flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-md w-full text-left'>
                  <div className='w-5 h-3 bg-green-700'></div>
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
