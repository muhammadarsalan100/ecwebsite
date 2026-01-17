"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { AppleStoreIcon, GooglePlayStoreIcon } from "@/assets/images";

export default function Footer() {
  return (
    <footer className='bg-[#008ECC] text-white relative overflow-hidden pt-16 pb-8'>
      {/* Decorative Circle Background */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12'>
          {/* Column 1: Brand & Contact */}
          <div className='space-y-8'>
            <h2 className='text-4xl font-bold tracking-tight'>Mega Mart</h2>

            <div className='space-y-6'>
              <h3 className='text-xl font-medium'>Contact Us</h3>

              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='mt-1'>
                    <MessageCircle className='w-6 h-6' />
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Whats App</p>
                    <p className='text-sm'>+1 202-918-2132</p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='mt-1'>
                    <Phone className='w-6 h-6' />
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Call Us</p>
                    <p className='text-sm'>+1 202-918-2132</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-xl font-medium'>Download App</h3>
              <div className='flex flex-wrap gap-4'>
                {/* App Store */}
                <Link
                  href='#'
                  className='bg-black rounded-lg flex items-center hover:opacity-80 transition-opacity min-w-[160px]'
                >
                  <Image
                    src={AppleStoreIcon}
                    alt='Download on the App Store'
                    width={160}
                    height={50}
                    className='object-contain'
                    priority
                  />
                </Link>

                {/* Google Play */}
                <Link
                  href='#'
                  className='bg-black rounded-lg flex items-center hover:opacity-80 transition-opacity min-w-[160px]'
                >
                  <Image
                    src={GooglePlayStoreIcon}
                    alt='Get it on Google Play'
                    width={160}
                    height={50}
                    className='object-contain'
                    priority
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Most Popular Categories */}
          <div>
            <h3 className='text-xl font-medium mb-6 relative inline-block'>
              Most Popular Categories
              <span className='absolute bottom-[-8px] left-0 w-full h-[2px] bg-white/30'></span>
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/shop/staples'
                  className='hover:underline opacity-90'
                >
                  Staples
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/beverages'
                  className='hover:underline opacity-90'
                >
                  Beverages
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/personal-care'
                  className='hover:underline opacity-90'
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/home-care'
                  className='hover:underline opacity-90'
                >
                  Home Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/baby-care'
                  className='hover:underline opacity-90'
                >
                  Baby Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/vegetables-fruits'
                  className='hover:underline opacity-90'
                >
                  Vegetables & Fruits
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/snacks-foods'
                  className='hover:underline opacity-90'
                >
                  Snacks & Foods
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/dairy-bakery'
                  className='hover:underline opacity-90'
                >
                  Dairy & Bakery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services */}
          <div>
            <h3 className='text-xl font-medium mb-6 relative inline-block'>
              Customer Services
              <span className='absolute bottom-[-8px] left-0 w-full h-[2px] bg-white/30'></span>
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/about' className='hover:underline opacity-90'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/terms' className='hover:underline opacity-90'>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href='/faq' className='hover:underline opacity-90'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='hover:underline opacity-90'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='/e-waste' className='hover:underline opacity-90'>
                  E-waste Policy
                </Link>
              </li>
              <li>
                <Link href='/returns' className='hover:underline opacity-90'>
                  Cancellation & Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-white/20 pt-8 text-center'>
          <p className='text-sm'>© {}2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
