"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowLeft, QrCode, Copy, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QUICK_AMOUNTS = ["1000", "900", "800", "700", "600", "500", "400", "300"];

export default function TopUpRequestPage() {
    const [selectedAmount, setSelectedAmount] = useState("450.73");
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        if (parseFloat(selectedAmount) > 0) {
            setIsConfirmed(true);
        }
    };

    if (isConfirmed) {
        return (
            <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">QR Code Generated</h1>
                    <p className="text-gray-500">Scan this QR code to complete your top-up request</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col items-center gap-8">
                    <div className="relative w-64 h-64 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                        {/* Using a QR code API for dynamic generation */}
                        <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=topup:${selectedAmount}`}
                            alt="Top up QR Code"
                            width={250}
                            height={250}
                            className="w-full h-full"
                            unoptimized
                        />
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-50">
                            <span className="text-gray-500 font-medium">Request Amount</span>
                            <span className="text-gray-900 font-bold">${selectedAmount} USD</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-50">
                            <span className="text-gray-500 font-medium">Request Type</span>
                            <span className="text-gray-900 font-bold">Top Up</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500 font-medium">Reference ID</span>
                            <span className="text-gray-900 font-bold">#TR-892341</span>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <Button variant="outline" className="flex-1 rounded-xl h-12 gap-2">
                            <Copy className="w-4 h-4" />
                            Copy Link
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-xl h-12 gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={() => setIsConfirmed(false)}
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-900 gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Amount Selection
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Top Up Request</h1>
                <p className="text-gray-500 mt-1">Enter the amount you would like to request</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm space-y-10">
                {/* Amount Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Enter Amount */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="amount-input" className="text-base font-bold text-gray-900 pl-1">Enter the Amount</label>
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-900 text-xl">$</div>
                                <Input
                                    id="amount-input"
                                    type="text"
                                    value={selectedAmount}
                                    onChange={(e) => setSelectedAmount(e.target.value)}
                                    className="pl-12 pr-24 py-8 text-2xl font-bold border-gray-100 bg-gray-50/30 rounded-2xl focus-visible:ring-blue-100 focus:border-blue-400"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l border-gray-200 pl-6">
                                    <span className="font-bold text-gray-900">USD</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-50 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-blue-600 text-sm font-medium">Standard processing fee of 0.5% will be applied.</p>
                        </div>
                    </div>

                    {/* Right: Pick Quick Amount */}
                    <div className="space-y-4">
                        <label className="text-base font-bold text-gray-900 pl-1">Pick a Quick Amount</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {QUICK_AMOUNTS.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setSelectedAmount(amount)}
                                    className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${selectedAmount === amount
                                            ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-200"
                                            : "bg-white border-gray-100 text-gray-600 hover:border-blue-400 hover:text-blue-500"
                                        }`}
                                >
                                    ${amount}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={handleConfirm}
                        className="w-full md:w-[320px] bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold py-8 rounded-2xl text-xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Confirm Request
                    </Button>
                </div>
            </div>
        </div>
    );
}
