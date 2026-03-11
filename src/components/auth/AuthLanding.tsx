"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../public/logo.png";
import { AuthLandingProps } from "@/types/auth";
import { Store } from "lucide-react";

export function AuthLanding({ onSignIn, onCreateAccount, onSkip, onBecomeSeller }: AuthLandingProps) {
    return (
        <div className='w-full max-w-md space-y-8 text-left px-6 sm:px-0 mx-auto sm:mx-0'>
            {/* Logo Wrapper */}
            <div className="block">
                <Image src={logo} alt='Logo' width={150} height={150} priority className="h-[100px] w-auto block" />
            </div>

            {/* Header */}
            <div className='space-y-6'>
                <h1
                    className='text-[28px] font-bold tracking-tight text-[#1A1A1A]'
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    Sign in to your Account
                </h1>

                <ul className='space-y-4 text-base text-[#4D4D4D] font-medium'>
                    <li>View your Wish List</li>
                    <li>Find & Reorder Past Purchase</li>
                    <li>Track your Purchase</li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className='space-y-4 pt-4'>
                <Button
                    onClick={onSignIn}
                    className='w-full h-[58px] text-base font-bold bg-[#0092FF] hover:bg-[#0081E0] text-white rounded-xl shadow-lg shadow-blue-500/10'
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    Already a customer? Sign in
                </Button>

                <Button
                    onClick={onCreateAccount}
                    className='w-full h-[58px] text-base font-bold bg-[#FFB04F] hover:bg-[#FFA32F] text-white rounded-xl shadow-lg shadow-orange-500/10 border-none'
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    New to Outfit? Create an Account
                </Button>

                <Button
                    onClick={onSkip}
                    variant='ghost'
                    className='w-full h-[58px] text-base font-bold bg-[#E6E6E6] hover:bg-[#D9D9D9] text-[#737373] rounded-xl'
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    Skip Sign in
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Seller CTA */}
                <Button
                    onClick={onBecomeSeller}
                    className='w-full h-[58px] text-base font-bold bg-white hover:bg-[#0092FF]/5 text-[#0092FF] border-2 border-[#0092FF] rounded-xl shadow-sm transition-all'
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    <Store className="w-5 h-5 mr-2" />
                    Become a Seller
                </Button>
            </div>
        </div>
    );
}
