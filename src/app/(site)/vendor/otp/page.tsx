"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import logo from "@/../public/logo.png";
import { vendorService } from "@/services/vendorService";
import { VendorRegistrationResponse } from "@/types/vendor";

export default function VendorOTPPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [regCode, setRegCode] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEmail = sessionStorage.getItem("vendorEmail") || "your email";
            const storedRegCode = sessionStorage.getItem("vendorRegCode");

            if (!storedRegCode) {
                router.replace("/vendor/auth");
            } else {
                setEmail(storedEmail);
                setRegCode(storedRegCode);
                setIsChecking(false);
            }
        }
    }, [router]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        setApiError(null);

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

    const handleVerify = async () => {
        const code = otp.join("");
        if (code.length < 4) {
            setApiError("Please enter all 4 digits.");
            return;
        }

        setIsLoading(true);
        setApiError(null);

        try {
            const response = await vendorService.verifyOTP(regCode, code) as VendorRegistrationResponse;
            if (response.code === "OK") {
                // Success - Could redirect to a Welcome page or Dashboard
                // For now, let's clear session and go to home or success
                sessionStorage.removeItem("vendorRegCode");
                sessionStorage.removeItem("vendorEmail");
                router.push("/vendor/success");
            } else {
                setApiError(response.message || "Verification failed.");
            }
        } catch (err: any) {
            setApiError(err.message || "Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-[#0092FF] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-md space-y-10">
                {/* Logo */}
                <div className="flex justify-center">
                    <Image src={logo} alt="Logo" width={160} height={160} priority className="h-[90px] w-auto" />
                </div>

                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-[32px] font-bold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
                        Verify OTP
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">
                        Enter the verification code sent to <br />
                        <span className="text-gray-900 font-semibold">{email}</span>
                    </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-16 sm:w-16 sm:h-20 text-center text-2xl font-bold bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#0092FF] focus:ring-4 focus:ring-[#0092FF]/5 outline-none transition-all text-gray-900 flex-none"
                        />
                    ))}
                </div>

                {/* Feedback/Error */}
                {apiError && (
                    <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-xl text-center animate-shake">
                        {apiError}
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={handleVerify}
                        disabled={isLoading}
                        className="w-full h-[58px] bg-[#0092FF] hover:bg-[#0081E0] disabled:bg-[#0092FF]/50 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>

                    <button
                        onClick={() => router.back()}
                        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to registration
                    </button>
                </div>

                {/* Resend (Placeholder - UX improvement) */}
                <p className="text-center text-[13px] text-gray-400">
                    Didn't receive the code?{" "}
                    <button className="text-[#0092FF] font-semibold hover:underline">Resend</button>
                </p>
            </div>
        </div>
    );
}
