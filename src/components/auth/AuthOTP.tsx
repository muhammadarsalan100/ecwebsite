"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../public/logo.png";

import { AuthOTPProps } from "@/types/auth";

import { authService } from "@/services/authService";

export function AuthOTP({ email, fullName, requestCode, loginSessionId, onContinue, onBack }: AuthOTPProps) {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(52);
    const [isResendActive, setIsResendActive] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setIsResendActive(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        if (error) setError(false);
        if (apiError) setApiError(null);

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleResend = () => {
        if (isResendActive) {
            setTimer(60);
            setIsResendActive(false);
            // Logic to resend OTP
        }
    };

    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleContinue = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const code = otp.join("");
        if (code.length < 4) {
            setError(true);
            return;
        }

        try {
            setIsLoading(true);
            setApiError(null);

            if (requestCode) {
                // REGISTRATION FLOW
                if (!isOtpVerified) {
                    try {
                        await authService.verifyOTP(requestCode, code);
                        setIsOtpVerified(true);
                    } catch (err: any) {
                        if (err.message?.toLowerCase().includes("already consumed")) {
                            setIsOtpVerified(true);
                        } else {
                            throw err;
                        }
                    }
                }

                if (fullName) {
                    await authService.createAccount(requestCode, email, fullName);
                }

                setIsLoading(false);
                onContinue(code);
            } else if (loginSessionId) {
                // LOGIN FLOW
                const response = await authService.confirmLogin(email, loginSessionId, code);
                setIsLoading(false);

                // Pass the whole data object which contains tokens and user info
                // We'll wrap it in a string to keep onContinue interface simple or just handle it in onContinue
                onContinue(JSON.stringify(response.data));
            }
        } catch (err: any) {
            setIsLoading(false);
            setApiError(err.message || "Operation failed. Please try again.");
            setError(true);
        }
    };

    return (
        <div className='w-full max-w-md space-y-8 text-left px-6 sm:px-0 mx-auto sm:mx-0'>
            {/* Logo Wrapper */}
            <div className="block">
                <Image src={logo} alt='Logo' width={150} height={150} priority className="h-[100px] w-auto block" />
            </div>

            {/* Header */}
            <div className='space-y-2'>
                <h1
                    className='text-[32px] font-bold tracking-tight text-[#1A1A1A]'
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    Enter OTP
                </h1>
                <p className='text-sm text-[#8A8A8A] font-medium'>
                    Please enter the OTP Sent to <span className="text-[#4D4D4D]">{email}</span>
                </p>
            </div>

            <form onSubmit={handleContinue}>
                {/* OTP Input Boxes */}
                <div className="flex flex-col items-center space-y-6 pt-4">
                    <div className="flex justify-between w-full max-w-[320px] gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`w-[66px] h-[72px] text-center text-2xl font-bold bg-white border ${error ? "border-red-500 ring-1 ring-red-500" : "border-[#E6E6E6] focus:border-[#0092FF] focus:ring-1 focus:ring-[#0092FF]"} rounded-xl outline-none transition-all text-[#1A1A1A]`}
                            />
                        ))}
                    </div>

                    {/* Resend/Timer Section */}
                    <div className="h-6 flex items-center justify-center">
                        {isResendActive ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-sm font-bold text-[#0092FF] hover:text-[#0081E0] transition-colors"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-sm font-medium text-[#A6A6A6]">
                                {formatTime(timer)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <div className='pt-4'>
                    {apiError && (
                        <p className="text-sm font-medium text-red-500 text-center pb-2">
                            {apiError}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className='w-full h-[58px] text-base font-bold bg-[#0092FF] hover:bg-[#0081E0] text-white rounded-xl shadow-lg shadow-blue-500/10'
                        style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                        {isLoading ? "Verifying..." : "Continue"}
                    </Button>

                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full text-center text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors pt-6"
                    >
                        ← Back to previous screen
                    </button>
                </div>
            </form>
        </div>
    );

}
