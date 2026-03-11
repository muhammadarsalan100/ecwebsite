"use client";

import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TransactionSuccessModalProps } from "@/types";



export function TransactionSuccessModal({ isOpen, onClose, data }: TransactionSuccessModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white w-full max-w-[460px] rounded-[32px] shadow-2xl overflow-hidden p-6 md:p-8 pt-10 flex flex-col items-center"
                >
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
                        <Check className="w-10 h-10 text-white stroke-[3px]" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Transaction done</h2>

                    {/* Transaction Details */}
                    <div className="w-full space-y-5 mb-10">
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="text-gray-400 text-sm font-medium">You top up</span>
                            <span className="text-gray-900 font-bold">${data.amount}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="text-gray-400 text-sm font-medium">From</span>
                            <span className="text-gray-900 font-bold">{data.cardNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="text-gray-400 text-sm font-medium">Payment method</span>
                            <span className="text-gray-900 font-bold">{data.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="text-gray-400 text-sm font-medium">Date</span>
                            <span className="text-gray-900 font-bold">{data.date}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="text-gray-400 text-sm font-medium">Transaction ID</span>
                            <span className="text-gray-900 font-bold uppercase">{data.transactionId}</span>
                        </div>
                    </div>

                    {/* Done Button */}
                    <Button
                        onClick={onClose}
                        className="w-[180px] bg-[#0092FF] hover:bg-[#0081E3] text-white font-bold py-6 rounded-xl text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                    >
                        Done
                    </Button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
