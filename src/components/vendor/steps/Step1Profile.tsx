"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VendorStepIndicator } from "@/components/vendor/VendorStepIndicator";
import { vendorStep1Schema } from "@/schemas/vendor.schema";

export interface Step1Data {
    fullName: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
}

interface Step1ProfileProps {
    data: Step1Data;
    onChange: (data: Step1Data) => void;
    onNext: () => void;
    onBack: () => void;
}

type Errors = Partial<Record<keyof Step1Data, string>>;

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase = "w-full h-[50px] rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all";
const inputNormal = `${inputBase} border-gray-200 focus:ring-[#0092FF]/30 focus:border-[#0092FF]`;
const inputError = `${inputBase} border-red-400 focus:ring-red-300/30 focus:border-red-400`;
const labelClass = "block text-xs text-gray-500 mb-1.5";
const errorClass = "mt-1.5 text-xs text-red-500";

// ─── Component ────────────────────────────────────────────────────────────────

export function Step1Profile({ data, onChange, onNext, onBack }: Step1ProfileProps) {
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field: keyof Step1Data) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (field === "phoneNumber") {
            // Allow digits, "+", "(", ")", "-", and spaces to support country codes
            if (!/^[+\d\s\-().]*$/.test(value)) return;
            if (value.length > 20) return;
        }

        const newData = { ...data, [field]: value };
        onChange(newData);

        if (submitted) {
            // Re-validate field on change after first submission using Zod
            const result = vendorStep1Schema.safeParse(newData);
            if (!result.success) {
                const fieldError = result.error.issues.find(err => err.path[0] === field)?.message;
                setErrors(prev => ({ ...prev, [field]: fieldError }));
            } else {
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        }
    };

    const handleNext = () => {
        setSubmitted(true);
        const result = vendorStep1Schema.safeParse(data);

        if (!result.success) {
            const newErrors: Errors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as keyof Step1Data] = err.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onNext();
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>Profile</h2>
                <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Verify your identity</p>
            </div>

            <VendorStepIndicator currentStep={1} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                        Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.fullName}
                        onChange={handleChange("fullName")}
                        placeholder="Enter Full Name"
                        className={errors.fullName ? inputError : inputNormal}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                    {errors.fullName && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                        Email <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={handleChange("email")}
                        placeholder="Enter Email"
                        className={errors.email ? inputError : inputNormal}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                    {errors.email && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                        Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="tel"
                        value={data.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                        placeholder="Enter Phone Number"
                        className={errors.phoneNumber ? inputError : inputNormal}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                    {errors.phoneNumber && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.phoneNumber}</p>}
                </div>

                {/* Street Address */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                        Street Address <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.streetAddress}
                        onChange={handleChange("streetAddress")}
                        placeholder="Enter Street Address"
                        className={errors.streetAddress ? inputError : inputNormal}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                    {errors.streetAddress && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.streetAddress}</p>}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-10">
                <button
                    onClick={onBack}
                    className="h-12 w-full sm:w-auto sm:px-8 order-2 sm:order-1 border border-gray-300 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all font-poppins active:scale-95"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="h-12 w-full sm:w-auto sm:px-12 order-1 sm:order-2 bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
