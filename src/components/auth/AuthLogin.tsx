"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import logo from "../../../public/logo.png";

import { AuthLoginProps } from "@/types/auth";
import { authService } from "@/services/authService";

export function AuthLogin({ onRegister, onBack, onLogin }: AuthLoginProps) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            authSchema.parse({ email });
            setError(null);
            setIsLoading(true);

            const response = await authService.initiateLogin(email);

            if (response.code === "OK" || response.Code === "OK") {
                onLogin(email, response.data.loginSessionId);
            } else {
                setError(response.Message || response.message || "Failed to initiate login");
            }
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0].message);
            } else {
                setError(err.message || "An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full max-w-md space-y-8 text-left px-6 sm:px-0 mx-auto sm:mx-0'>
            {/* Logo */}
            <div className='block'>
                <Image src={logo} alt='Logo' width={150} height={150} priority className="h-[100px] w-auto block" />
            </div>

            {/* Header */}
            <div className=' space-y-2'>
                <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>Sign in</h1>
                <p className='text-sm text-muted-foreground'>
                    Don’t have an account?{" "}
                    <button
                        onClick={onRegister}
                        className='text-blue-600 font-semibold hover:underline'
                    >
                        Create now
                    </button>
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-7'>
                <div className="space-y-3">
                    <Input
                        type='text'
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(null);
                        }}
                        className={`h-12 text-sm sm:text-base border-zinc-300 focus-visible:ring-blue-500 ${error ? "border-red-500" : ""}`}
                    />
                    {error && (
                        <p className="text-sm font-medium text-red-500">{error}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className='w-full h-12 text-sm sm:text-base font-semibold bg-blue-500 hover:bg-blue-600'
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                {/* Divider */}
                <div className='relative flex items-center py-2'>
                    <div className='flex-grow border-t border-zinc-200' />
                    <span className='mx-4 text-xs font-semibold text-zinc-400'>
                        OR
                    </span>
                    <div className='flex-grow border-t border-zinc-200' />
                </div>

                {/* Social */}
                <div className='space-y-6'>
                    <Button
                        type="button"
                        variant='outline'
                        className='w-full h-12 flex items-center justify-center gap-3 rounded-lg text-sm sm:text-base'
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
                        type="button"
                        variant='outline'
                        className='w-full h-12 flex items-center justify-center gap-3 rounded-lg text-sm sm:text-base'
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

                <button
                    type="button"
                    onClick={onBack}
                    className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors pt-4"
                >
                    ← Back to landing
                </button>
            </form>
        </div>
    );

}
