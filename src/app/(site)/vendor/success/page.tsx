"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import logo from "@/../public/logo.png";

export default function VendorSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <Image src={logo} alt="Logo" width={160} height={160} priority className="h-[90px] w-auto" />
                </div>

                {/* Success Icon */}
                <div className="relative flex justify-center">
                    <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full scale-150"></div>
                    <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20 animate-bounce-slow">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                    <h1 className="text-[32px] font-bold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
                        Verification Successful!
                    </h1>
                    <p className="text-gray-500">
                        Your vendor account has been created successfully. Our team will review your application and get back to you shortly.
                    </p>
                </div>

                {/* Dashboard / Home Button */}
                <div className="pt-6 space-y-4">
                    <button
                        onClick={() => router.push("/")}
                        className="w-full h-[58px] bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Go to Marketplace
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full flex items-center justify-center gap-2 text-sm text-[#0092FF] hover:text-[#0081E0] font-bold transition-colors"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Start selling now
                    </button>
                </div>

                {/* Decorative Elements */}
                <p className="text-[13px] text-gray-400 mt-10">
                    Need help? <button className="text-gray-900 font-semibold underline">Contact Support</button>
                </p>
            </div>

            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
                    50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite;
                }
            `}</style>
        </div>
    );
}
