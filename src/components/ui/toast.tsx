"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, CheckCircle, AlertCircle, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "auth";

interface ToastProps {
    isVisible: boolean;
    message: string;
    type?: ToastType;
    onClose: () => void;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const Toast = ({
    isVisible,
    message,
    type = "info",
    onClose,
    duration = 3000,
    action
}: ToastProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isVisible && duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-[#0092FF]" />,
        auth: <LogIn className="w-5 h-5 text-[#0092FF]" />
    };

    const backgrounds = {
        success: "bg-green-50 border-green-100",
        error: "bg-red-50 border-red-100",
        info: "bg-blue-50 border-blue-100",
        auth: "bg-blue-50 border-blue-100"
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-x-0 bottom-8 z-[9999] flex justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={cn(
                            "pointer-events-auto px-6 py-4 rounded-2xl border shadow-xl bg-white",
                            "flex items-center gap-4 min-w-[320px] max-w-[90vw]",
                            backgrounds[type]
                        )}
                    >
                        <div className="flex-shrink-0">
                            {icons[type]}
                        </div>

                        <p className="flex-1 text-[14px] font-medium text-gray-800 font-poppins">
                            {message}
                        </p>

                        {action && (
                            <button
                                onClick={() => {
                                    action.onClick();
                                    onClose();
                                }}
                                className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-[#0092FF] text-white text-[12px] font-bold hover:bg-[#007cdb] transition-colors pointer-events-auto shadow-sm"
                            >
                                {action.label}
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1.5 hover:bg-black/5 rounded-full transition-colors pointer-events-auto"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
