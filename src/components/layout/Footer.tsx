"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

import { AppleStoreIcon, GooglePlayStoreIcon } from "@/assets/images";
import whatsapp from "../../../public/whatsapp.svg";

export default function Footer() {
  return (
    <footer
      className='bg-[#0092FF] text-white relative overflow-hidden px-5 py-10 md:px-10 lg:px-[130px] lg:pt-[80px] lg:pb-[30px] text-poppins'
    >
      {/* Decorative Circle Background */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none'></div>

      <div className='relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-12 mb-12'>
          {/* Column 1: Brand & Contact */}
          <div className='space-y-8'>
            <h2
              className='text-white font-readex text-4xl lg:text-[50px] font-medium leading-normal'
            >
              Mega Mart
            </h2>

            <div className='space-y-6'>
              <div className='relative inline-block'>
                <h3
                  className='text-white font-readex text-lg lg:text-[20px] font-normal leading-5'
                >
                  Contact Us
                </h3>
                <div
                  className='w-[150px] lg:w-[219px] h-[3px] bg-white mt-2'
                />
              </div>

              <div className='space-y-0 lg:space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='mt-1'>
                    <Image
                      src={whatsapp}
                      alt='WhatsApp Icon'
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <p
                      className='text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px]'
                    >
                      Whats App
                    </p>
                    <p
                      className='text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px]'
                    >
                      +1 202-918-2132
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='mt-1'>
                    <Phone className='w-6 h-6' />
                  </div>
                  <div>
                    <p
                      className='text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px]'
                    >
                      Call Us
                    </p>
                    <p
                      className='text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px]'
                    >
                      +1 202-918-2132
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='hidden md:block space-y-4'>
              <div className='relative inline-block'>
                <h3
                  className='text-white font-readex text-lg lg:text-[20px] font-normal leading-5'
                >
                  Download App
                </h3>
                <div
                  className='w-[150px] lg:w-[219px] h-[3px] bg-white mt-2'
                />
              </div>
              <div className='flex gap-4'>
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
            <div className='relative inline-block mt-6 mb-6'>
              <h3
                className='text-white font-readex text-lg lg:text-[20px] font-normal leading-5'
              >
                Most Popular Categories
              </h3>
              <div
                className='w-[150px] lg:w-[219px] h-[3px] bg-white mt-2'
              />
            </div>
            <ul>
              <li>
                <Link
                  href='/shop/staples'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Staples
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/beverages'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Beverages
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/personal-care'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/home-care'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Home Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/baby-care'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Baby Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/vegetables-fruits'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Vegetables & Fruits
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/snacks-foods'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Snacks & Foods
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/dairy-bakery'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Dairy & Bakery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services */}
          <div>
            <div className='relative inline-block mt-6 mb-6'>
              <h3
                className='text-white font-readex text-lg lg:text-[20px] font-normal leading-5'
              >
                Customer Services
              </h3>
              <div
                className='w-[150px] lg:w-[219px] h-[3px] bg-white mt-2'
              />
            </div>
            <ul>
              <li>
                <Link
                  href='/about'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/e-waste'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • E-waste Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/returns'
                  className='hover:underline text-white font-readex text-sm lg:text-[16px] font-normal leading-loose lg:leading-[37px] block'
                >
                  • Cancellation & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Only: Download App (Moved to bottom) */}
          <div className='block md:hidden space-y-4'>
            <div className='relative inline-block'>
              <h3
                className='text-white font-readex text-lg lg:text-[20px] font-normal leading-5'
              >
                Download App
              </h3>
              <div
                className='w-[150px] lg:w-[219px] h-[3px] bg-white mt-2'
              />
            </div>
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

        {/* Copyright */}
        <div className='border-t border-white/20 pt-8 text-center'>
          <p
            className='text-white font-readex text-sm lg:text-[16px] font-normal'
          >
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
