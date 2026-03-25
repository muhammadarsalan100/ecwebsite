"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registrationSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/authService";
import { AuthRegisterProps } from "@/types/auth";
import logo from "../../../public/logo.png";

export function AuthRegister({ onSignIn, onBack, onSuccess }: AuthRegisterProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [regErrors, setRegErrors] = useState<Partial<Record<string, string>>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            registrationSchema.parse({ fullName, email, password });
            setRegErrors({});
            setApiError(null);
            setIsLoading(true);

            const response = await authService.requestOTP(email);

            setIsLoading(false);
            // Stronger type safety: access data.code directly
            const requestCode = response.data?.code;

            if (requestCode) {
                onSuccess(email, fullName, requestCode);
            } else {
                throw new Error("No registration code received from server.");
            }
        } catch (err: any) {
            setIsLoading(false);
            if (err instanceof z.ZodError) {
                const errors: Partial<Record<string, string>> = {};
                err.issues.forEach((issue) => {
                    const path = issue.path[0] as string;
                    if (path && !errors[path]) {
                        errors[path] = issue.message;
                    }
                });
                setRegErrors(errors);
            } else {
                setApiError(err.message || "An unexpected error occurred");
                console.error("OTP Request failed:", err);
            }
        }
    };

    return (
        <div className='w-full max-w-md space-y-6 text-left px-6 sm:px-0 mx-auto sm:mx-0'>
            {/* Logo */}
            <div className='block'>
                <Image src={logo} alt='Logo' width={150} height={150} priority className="h-[100px] w-auto block" />
            </div>

            <div className='space-y-1'>
                <h1 className='text-[32px] font-bold tracking-tight text-[#1A1A1A]' style={{ fontFamily: 'var(--font-poppins)' }}>Create Account</h1>
                <p className='text-[13px] text-[#737373] leading-relaxed max-w-[340px]'>
                    Enter your email id for the verification process, We will send 4 digit code to your email
                </p>
            </div>

            <form onSubmit={handleRegister} className='space-y-4'>
                {/* Name Field */}
                <div className='space-y-1.5'>
                    <label className='text-sm text-[#8A8A8A] font-medium'>First and last name</label>
                    <Input
                        placeholder='Enter first and last name'
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            if (regErrors.fullName) setRegErrors(prev => ({ ...prev, fullName: undefined }));
                            if (apiError) setApiError(null);
                        }}
                        className={`h-[54px] bg-white border-[#E6E6E6] rounded-xl px-4 text-sm ${regErrors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    {regErrors.fullName && <p className="text-[11px] text-red-500 font-medium pl-1">{regErrors.fullName}</p>}
                </div>

                {/* Email Field */}
                <div className='space-y-1.5'>
                    <label className='text-sm text-[#8A8A8A] font-medium'>Email or phone number</label>
                    <Input
                        placeholder='Enter email or phone number'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (regErrors.email) setRegErrors(prev => ({ ...prev, email: undefined }));
                            if (apiError) setApiError(null);
                        }}
                        className={`h-[54px] bg-white border-[#E6E6E6] rounded-xl px-4 text-sm ${regErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    {regErrors.email && <p className="text-[11px] text-red-500 font-medium pl-1">{regErrors.email}</p>}
                </div>

                {/* Password Field */}
                <div className='space-y-1.5'>
                    <label className='text-sm text-[#8A8A8A] font-medium'>Create a password</label>
                    <div className='relative'>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (regErrors.password) setRegErrors(prev => ({ ...prev, password: undefined }));
                                if (apiError) setApiError(null);
                            }}
                            className={`h-[54px] bg-white border-[#E6E6E6] rounded-xl px-4 pr-12 text-sm ${regErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-[#A6A6A6]'
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {regErrors.password && <p className="text-[11px] text-red-500 font-medium pl-1">{regErrors.password}</p>}
                </div>

                <div className='space-y-4 pt-2'>
                    {apiError && (
                        <p className="text-sm font-medium text-red-500 text-center animate-in fade-in slide-in-from-top-1">
                            {apiError}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className='w-full h-[54px] bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold rounded-xl shadow-lg shadow-blue-500/10'
                        style={{ fontFamily: 'var(--font-poppins)' }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Requesting OTP..." : "Continue"}
                    </Button>
                </div>

                <button
                    type="button"
                    onClick={onSignIn}
                    className="w-full text-center text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors pt-2"
                >
                    Already have an account? Sign in
                </button>

                <button
                    type="button"
                    onClick={onBack}
                    className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ← Back to options
                </button>
            </form>
        </div>
    );

}
