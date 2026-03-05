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
        <div className="flex items-center gap-0 mb-8">
            {VENDOR_STEPS.map((step, idx) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;
                const isLast = idx === VENDOR_STEPS.length - 1;

                return (
                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                        {/* Circle + Label */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={cn(
                                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                    isCompleted || isActive
                                        ? "bg-[#0092FF] text-white shadow-md shadow-blue-500/30"
                                        : "bg-gray-200 text-gray-400"
                                )}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.id
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-semibold whitespace-nowrap",
                                    isActive ? "text-[#0092FF]" : isCompleted ? "text-[#0092FF]" : "text-gray-400"
                                )}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "flex-1 h-0.5 mb-5 mx-1",
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
