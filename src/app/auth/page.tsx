"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import banner from "../../../public/banner.png";
import logo from "../../../public/logo.png";

export default function LoginPage() {
  // Hooks
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  // Constants
  const targetEmail = "marsalanmalik455@gmail.com";

  // Functions
  const handleAuth = () => {
    if (email === targetEmail) {
      login(email);
    } else {
      alert("Please use the authorized email for testing.");
    }
  };

  return (
    <div className='flex h-screen w-full'>
      {/* LEFT IMAGE */}
      <div className='relative hidden w-1/2 md:block'>
        <Image
          src={banner}
          alt='Banner'
          priority
          className='h-full object-contain'
        />
      </div>

      {/* RIGHT FORM */}
      <div className='flex w-full md:w-1/2 items-center  px-6'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='flex '>
            <div className='h-14 w-14 rounded-xl'>
              <Image src={logo} alt='Logo' width={100} height={100} priority style={{ height: '56px', width: 'auto' }} />
            </div>
          </div>

          {/* Header */}
          <div className=' space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight'>Sign in</h1>
            <p className='text-sm text-muted-foreground'>
              Don’t have an account?{" "}
              <Link
                href='#'
                className='text-blue-600 font-semibold hover:underline'
              >
                Create now
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className='space-y-5'>
            <Input
              type='email'
              placeholder={targetEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='h-12 text-base border-zinc-300 focus-visible:ring-blue-500'
            />

            <Button
              onClick={handleAuth}
              className='w-full h-12 text-base font-semibold bg-blue-500 hover:bg-blue-600'
            >
              Sign Up
            </Button>

            {/* Divider */}
            <div className='relative flex items-center'>
              <div className='flex-grow border-t border-zinc-200' />
              <span className='mx-4 text-xs font-semibold text-zinc-400'>
                OR
              </span>
              <div className='flex-grow border-t border-zinc-200' />
            </div>

            {/* Social */}
            <div className='space-y-3'>
              <Button
                variant='outline'
                className='w-full h-12 flex items-center justify-center gap-3 rounded-lg'
              >
                <Image
                  src='https://authjs.dev/img/providers/google.svg'
                  alt='Google'
                  width={20}
                  height={20}
                />
                Continue with Google
              </Button>

              <Button
                variant='outline'
                className='w-full h-12 flex items-center justify-center gap-3 rounded-lg'
              >
                <Image
                  src='https://authjs.dev/img/providers/facebook.svg'
                  alt='Facebook'
                  width={20}
                  height={20}
                />
                Continue with Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
