"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            mass: 0.8
                        }}
                        className="bg-white rounded-[24px] sm:rounded-[44px] shadow-2xl w-full max-w-[740px] overflow-hidden"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        <div className="p-6 xs:p-8 sm:p-12 md:p-14">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-[32px] font-bold text-gray-900 tracking-tight">
                                    Add Your Payment Method
                                </h2>
                            </div>

                            {/* Section: Credit or debit cards */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-800 text-xl leading-none">Credit or debit cards</h3>
                                    <p className="text-[14px] text-gray-400 font-medium">Tech Heim accepts major credit and debit cards.</p>
                                </div>
                                <div className="flex items-center gap-4 py-1 px-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                    {/* Mock Card Logos */}
                                    <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                                        {/* American Express */}
                                        <div className="flex flex-col items-center justify-center leading-none">
                                            <span className="text-[8px] font-extrabold text-[#006fcf] italic uppercase">American</span>
                                            <span className="text-[8px] font-extrabold text-[#006fcf] italic uppercase">Express</span>
                                        </div>

                                        {/* Mastercard */}
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-[#eb001b]"></div>
                                            <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-80"></div>
                                        </div>

                                        {/* Visa */}
                                        <div className="text-lg font-black text-[#1a1f71] italic tracking-tighter">VISA</div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
                                <div className="md:col-span-2">
                                    <Input
                                        placeholder="Credit or debit cards"
                                        className="h-16 rounded-2xl border-gray-200 px-7 text-lg placeholder:text-gray-300 focus-visible:ring-[#0092FF]/20 focus-visible:border-[#0092FF] transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        placeholder="Credit or debit cards"
                                        className="h-16 rounded-2xl border-gray-200 px-7 text-lg placeholder:text-gray-300 focus-visible:ring-[#0092FF]/20 focus-visible:border-[#0092FF] transition-all"
                                    />
                                </div>
                                <div>
                                    <Input
                                        placeholder="Expiration Date"
                                        className="h-16 rounded-2xl border-gray-200 px-7 text-lg placeholder:text-gray-300 focus-visible:ring-[#0092FF]/20 focus-visible:border-[#0092FF] transition-all"
                                    />
                                </div>
                                <div>
                                    <Input
                                        placeholder="CVV"
                                        className="h-16 rounded-2xl border-gray-200 px-7 text-lg placeholder:text-gray-300 focus-visible:ring-[#0092FF]/20 focus-visible:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="w-full sm:w-[200px] h-14 rounded-2xl border-[#0092FF] text-[#0092FF] font-bold text-lg hover:bg-blue-50 active:scale-95 transition-all"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="w-full sm:w-[200px] h-14 rounded-2xl bg-[#0092FF] text-white font-bold text-lg hover:bg-blue-600 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
