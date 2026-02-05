"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Globe,
    User,
    MapPin,
    Banknote,
    Wallet,
    PencilLine,
    ChevronDown
} from "lucide-react";

export default function TopUpConfirmPage() {
    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
                <p className="text-gray-500 mt-1 text-sm">Track, return or purchase items</p>
            </div>

            {/* Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Debit Account */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Debit Account</label>
                        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm h-[56px]">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-gray-900" />
                                <span className="font-bold text-gray-900 text-sm">Aruban Florin (AWG)</span>
                            </div>
                            <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Top Up Type */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Up Type</label>
                        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm h-[56px]">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-900" />
                                <span className="font-bold text-gray-900 text-sm">Pick up by Agent</span>
                            </div>
                            <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Select Location */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Location</label>
                        <div className="relative">
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm h-[56px] cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <span className="font-bold text-gray-400 text-sm">Nearest Location</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Amount From AWG */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount From AWG</label>
                        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm h-[56px]">
                            <div className="flex items-center gap-3">
                                <Banknote className="w-5 h-5 text-gray-900" />
                                <span className="font-bold text-gray-900 text-sm">5000</span>
                            </div>
                            <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                <PencilLine className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Charge Type */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Charge Type</label>
                        <div className="relative">
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm h-[56px] cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-5 h-5 text-gray-400" />
                                    <span className="font-bold text-gray-400 text-sm">Select Charge Type</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Deposit Purpose */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Deposit Purpose</label>
                        <Input
                            placeholder="Deposit Purpose"
                            className="h-[56px] border-gray-100 rounded-xl shadow-sm px-4 text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:ring-0"
                        />
                    </div>
                </div>
            </div>

            {/* Confirm Button */}
            <div className="pt-12 flex justify-center">
                <Button className="w-full md:w-[320px] bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold py-7 rounded-2xl text-xl shadow-xl shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Confirm
                </Button>
            </div>
        </div>
    );
}
