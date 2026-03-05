"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Store, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vendorService } from "@/services/vendorService";
import logo from "../../../public/logo.png";

interface VendorAuthLandingProps {
    onContinue: (email: string, initCode: string) => void;
    onBack: () => void;
}

export function VendorAuthLanding({ onContinue, onBack }: VendorAuthLandingProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await vendorService.initRegistration(email.trim());
            // API returns { data: { code: "<initCode>" }, code: "OK", message: "Initiated" }
            if (response?.data?.code) {
                onContinue(email.trim(), response.data.code);
            } else {
                setError("Unexpected response. Please try again.");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8 px-6 sm:px-0 mx-auto sm:mx-0">
            {/* Back */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0092FF] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            {/* Logo */}
            <div className="block">
                <Image src={logo} alt="Logo" width={150} height={150} priority className="h-[80px] w-auto block" />
            </div>

            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0092FF]/10">
                        <Store className="h-5 w-5 text-[#0092FF]" />
                    </div>
                    <span
                        className="text-sm font-semibold text-[#0092FF] uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Seller Registration
                    </span>
                </div>

                <h1
                    className="text-[28px] font-bold tracking-tight text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    Become a Seller
                </h1>

                <p className="text-base text-[#4D4D4D]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Start selling on Outfit and reach thousands of customers. Enter your email to begin.
                </p>

                <ul className="space-y-2 text-sm text-[#4D4D4D] font-medium pt-1">
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0092FF] inline-block" />
                        Set up your own store
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0092FF] inline-block" />
                        List unlimited products
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0092FF] inline-block" />
                        Reach a global market
                    </li>
                </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                    <label
                        htmlFor="vendor-email"
                        className="block text-sm font-semibold text-[#1A1A1A]"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Email Address
                    </label>
                    <input
                        id="vendor-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(null);
                        }}
                        placeholder="e.g. yourstore@email.com"
                        className="w-full h-[54px] rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/40 focus:border-[#0092FF] transition-all"
                        style={{ fontFamily: "var(--font-poppins)" }}
                        disabled={isLoading}
                    />
                    {error && (
                        <p className="text-sm text-red-500" style={{ fontFamily: "var(--font-poppins)" }}>
                            {error}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="w-full h-[58px] text-base font-bold bg-[#0092FF] hover:bg-[#0081E0] disabled:bg-[#0092FF]/50 text-white rounded-xl shadow-lg shadow-blue-500/10 border-none transition-all"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </span>
                    ) : (
                        "Continue as Seller"
                    )}
                </Button>

            </form>
        </div>
    );
}
