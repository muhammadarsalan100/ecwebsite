"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TopUpSuccessPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] rounded-[40px] overflow-hidden">
            <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
                <div className="bg-[#1E293B]/60 backdrop-blur-3xl border border-white/5 rounded-[32px] p-8 md:p-12 shadow-[0_0_80px_rgba(30,58,138,0.3)] text-center space-y-10">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all animate-pulse">
                            <CheckCircle2 className="w-9 h-9 text-emerald-400" strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                        <h1 className="text-[32px] font-bold text-white tracking-tight leading-snug">Payment Successful</h1>
                        <p className="text-slate-400 text-base leading-relaxed max-w-[280px] mx-auto opacity-80">
                            Your payment was completed successfully. Thank you!
                        </p>
                    </div>

                    {/* Status Box */}
                    <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/5 shadow-inner">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[2px] mb-2 pl-0.5">Status</p>
                        <p className="text-emerald-400 font-bold text-[20px] tracking-wide">Confirmed</p>
                    </div>

                    {/* Back Button */}
                    <Link href="/" className="block pt-2 animate-in slide-in-from-bottom-4 duration-700">
                        <Button className="w-full h-[60px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-lg shadow-[0_12px_30px_rgba(99,102,241,0.25)] transition-all flex items-center justify-center gap-3">
                            Back to Home
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
