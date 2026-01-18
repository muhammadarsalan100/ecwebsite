"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { AppleStoreIcon, GooglePlayStoreIcon } from "@/assets/images";

export default function Footer() {
  return (
    <footer className='bg-[#0090FF] text-white relative overflow-hidden' style={{ paddingLeft: "130px", paddingRight: "130px", paddingTop: "80px", paddingBottom: "30px" }}>
      {/* Decorative Circle Background */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none'></div>

      <div className='relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12'>
          {/* Column 1: Brand & Contact */}
          <div className='space-y-8'>
            <h2
              style={{
                color: "#FFF",
                fontFamily: "var(--font-readex-pro)",
                fontSize: "50px",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Mega Mart
            </h2>

            <div className='space-y-6'>
              <div className='relative inline-block'>
                <h3
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Contact Us
                </h3>
                <div
                  style={{
                    width: "219px",
                    height: "3px",
                    background: "#FFF",
                    marginTop: "8px",
                  }}
                />
              </div>

              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='mt-1'>
                    <MessageCircle className='w-6 h-6' />
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#FFF",
                        fontFamily: "var(--font-readex-pro)",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "37px",
                      }}
                    >
                      Whats App
                    </p>
                    <p
                      style={{
                        color: "#FFF",
                        fontFamily: "var(--font-readex-pro)",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "37px",
                      }}
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
                      style={{
                        color: "#FFF",
                        fontFamily: "var(--font-readex-pro)",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "37px",
                      }}
                    >
                      Call Us
                    </p>
                    <p
                      style={{
                        color: "#FFF",
                        fontFamily: "var(--font-readex-pro)",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "37px",
                      }}
                    >
                      +1 202-918-2132
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='relative inline-block'>
                <h3
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Download App
                </h3>
                <div
                  style={{
                    width: "219px",
                    height: "3px",
                    background: "#FFF",
                    marginTop: "8px",
                  }}
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

          {/* Column 2: Most Popular Categories */}
          <div>
            <div className='relative inline-block mb-6'>
              <h3
                style={{
                  color: "#FFF",
                  fontFamily: "var(--font-readex-pro)",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Most Popular Categories
              </h3>
              <div
                style={{
                  width: "219px",
                  height: "3px",
                  background: "#FFF",
                  marginTop: "8px",
                }}
              />
            </div>
            <ul>
              <li>
                <Link
                  href='/shop/staples'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Staples
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/beverages'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Beverages
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/personal-care'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/home-care'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Home Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/baby-care'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Baby Care
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/vegetables-fruits'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Vegetables & Fruits
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/snacks-foods'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Snacks & Foods
                </Link>
              </li>
              <li>
                <Link
                  href='/shop/dairy-bakery'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Dairy & Bakery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services */}
          <div>
            <div className='relative inline-block mb-6'>
              <h3
                style={{
                  color: "#FFF",
                  fontFamily: "var(--font-readex-pro)",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Customer Services
              </h3>
              <div
                style={{
                  width: "219px",
                  height: "3px",
                  background: "#FFF",
                  marginTop: "8px",
                }}
              />
            </div>
            <ul>
              <li>
                <Link
                  href='/about'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/e-waste'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • E-waste Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/returns'
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-readex-pro)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "37px",
                  }}
                  className='hover:underline'
                >
                  • Cancellation & Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-white/20 pt-8 text-center'>
          <p
            style={{
              color: "#FFF",
              fontFamily: "var(--font-readex-pro)",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
