"use client";

import { useState } from "react";
import { VendorStepIndicator } from "@/components/vendor/VendorStepIndicator";
import { vendorStep3Schema } from "@/schemas/vendor.schema";

export interface Step3Data {
    country: string;
    zipCode: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
}

interface Step3BusinessInfoProps {
    data: Step3Data;
    onChange: (data: Step3Data) => void;
    onNext: () => void;
    onCancel: () => void;
}

type Errors = Partial<Record<keyof Step3Data, string>>;

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase = "w-full h-[50px] rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all";
const inputNormal = `${inputBase} border-gray-200 focus:ring-[#0092FF]/30 focus:border-[#0092FF]`;
const inputError = `${inputBase} border-red-400 focus:ring-red-300/30 focus:border-red-400`;
const labelClass = "block text-xs text-gray-500 mb-1.5";
const errorClass = "mt-1.5 text-xs text-red-500";

// ─── Component ────────────────────────────────────────────────────────────────

export function Step3BusinessInfo({ data, onChange, onNext, onCancel }: Step3BusinessInfoProps) {
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field: keyof Step3Data) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newData = { ...data, [field]: value };
        onChange(newData);

        if (submitted) {
            const result = vendorStep3Schema.safeParse(newData);
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
        const result = vendorStep3Schema.safeParse(data);

        if (!result.success) {
            const newErrors: Errors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as keyof Step3Data] = err.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onNext();
    };

    const field = (key: keyof Step3Data, label: string, placeholder: string, optional = false) => (
        <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                {label} {!optional && <span className="text-red-400">*</span>}
            </label>
            <input
                type="text"
                value={data[key]}
                onChange={handleChange(key)}
                placeholder={placeholder}
                className={errors[key] ? inputError : inputNormal}
                style={{ fontFamily: "var(--font-poppins)" }}
            />
            {errors[key] && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors[key]}</p>}
        </div>
    );

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>Business Information</h2>
                <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Verify your identity</p>
            </div>

            <VendorStepIndicator currentStep={3} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {field("country", "Select Country", "Enter Country")}
                {field("zipCode", "ZIP / Postal Code", "Enter ZIP / Postal Code")}
                {field("state", "State / Region", "Enter State / Region")}
                {field("city", "City / Town", "Enter City / Town")}
                {field("addressLine1", "Address Line 1", "Enter Address Line 1")}
                {field("addressLine2", "Address Line 2", "Enter Address Line 2 (optional)", true)}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-8">
                <button onClick={onCancel} className="h-11 px-8 border border-gray-300 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all font-poppins" style={{ fontFamily: "var(--font-poppins)" }}>Cancel</button>
                <button onClick={handleNext} className="h-11 px-10 bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 font-poppins" style={{ fontFamily: "var(--font-poppins)" }}>Next</button>
            </div>
        </div>
    );
}
