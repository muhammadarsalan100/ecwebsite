"use client";

import { cn } from "@/lib/utils";

export const VENDOR_STEPS = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Bank Account" },
    { id: 3, label: "Business Information" },
    { id: 4, label: "Identity Proof" },
] as const;

interface VendorStepIndicatorProps {
    currentStep: number;
}

export function VendorStepIndicator({ currentStep }: VendorStepIndicatorProps) {
    return (
        <div className="flex items-center gap-0 mb-8 sm:mb-12">
            {VENDOR_STEPS.map((step, idx) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;
                const isLast = idx === VENDOR_STEPS.length - 1;

                return (
                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                        {/* Circle + Label */}
                        <div className="relative flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all z-10",
                                    isCompleted || isActive
                                        ? "bg-[#0092FF] text-white shadow-lg shadow-blue-500/30"
                                        : "bg-gray-100 text-gray-400 border border-gray-200"
                                )}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.id
                                )}
                            </div>

                            {/* Label - Hidden on mobile, shown on SM+ */}
                            <span
                                className={cn(
                                    "absolute top-full mt-2 text-[10px] sm:text-xs font-bold whitespace-nowrap hidden sm:block",
                                    isActive ? "text-[#0092FF]" : isCompleted ? "text-[#0092FF]" : "text-gray-400"
                                )}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {step.label}
                            </span>

                            {/* Mobile Active Label - Only shows for the CURRENT active step on mobile */}
                            {isActive && (
                                <span
                                    className="absolute top-full mt-2 text-[10px] font-bold text-[#0092FF] whitespace-nowrap sm:hidden"
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {step.label}
                                </span>
                            )}
                        </div>

                        {/* Connector line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "flex-1 h-[2px] mx-1 sm:mx-2",
                                    isCompleted ? "bg-[#0092FF]" : "bg-gray-200"
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
