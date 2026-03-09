"use client";

import { useRef, useState } from "react";
import { CloudUpload, X, CheckCircle2 } from "lucide-react";
import { VendorStepIndicator } from "@/components/vendor/VendorStepIndicator";
import { vendorStep2Schema } from "@/schemas/vendor.schema";

export interface Step2Data {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    branchCode: string;
    iban: string;
    bankStatementFile: File | null;
}

interface Step2BankAccountProps {
    data: Step2Data;
    onChange: (data: Step2Data) => void;
    onNext: () => void;
    onBack: () => void;
}

type Errors = Partial<Record<keyof Step2Data, string>>;

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase = "w-full h-[50px] rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all";
const inputNormal = `${inputBase} border-gray-200 focus:ring-[#0092FF]/30 focus:border-[#0092FF]`;
const inputError = `${inputBase} border-red-400 focus:ring-red-300/30 focus:border-red-400`;
const labelClass = "block text-xs text-gray-500 mb-1.5";
const errorClass = "mt-1.5 text-xs text-red-500";

// ─── Component ────────────────────────────────────────────────────────────────

export function Step2BankAccount({ data, onChange, onNext, onBack }: Step2BankAccountProps) {
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (field: keyof Omit<Step2Data, "bankStatementFile">) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;

            if (field === "accountNumber") {
                // Digits only
                value = value.replace(/\D/g, "");
            }

            const newData = { ...data, [field]: value };
            onChange(newData);

            if (submitted) {
                const result = vendorStep2Schema.safeParse(newData);
                if (!result.success) {
                    const fieldError = result.error.issues.find(err => err.path[0] === field)?.message;
                    setErrors(prev => ({ ...prev, [field]: fieldError }));
                } else {
                    setErrors(prev => ({ ...prev, [field]: undefined }));
                }
            }
        };

    const handleFile = (file: File | null) => {
        if (!file) return;
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            setErrors((prev) => ({ ...prev, bankStatementFile: "Only JPG and PNG files are allowed." }));
            return;
        }
        onChange({ ...data, bankStatementFile: file });
        setErrors((prev) => ({ ...prev, bankStatementFile: undefined }));
    };

    const handleNext = () => {
        setSubmitted(true);
        const result = vendorStep2Schema.safeParse(data);

        if (!result.success) {
            const newErrors: Errors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as keyof Step2Data] = err.message;
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
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>Bank Account</h2>
                <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Verify your identity</p>
            </div>

            <VendorStepIndicator currentStep={2} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Bank Name */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Bank Name <span className="text-red-400">*</span></label>
                    <input type="text" value={data.bankName} onChange={handleChange("bankName")} placeholder="Enter Bank Name" className={errors.bankName ? inputError : inputNormal} style={{ fontFamily: "var(--font-poppins)" }} />
                    {errors.bankName && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.bankName}</p>}
                </div>

                {/* Account Title */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Account Title <span className="text-red-400">*</span></label>
                    <input type="text" value={data.accountTitle} onChange={handleChange("accountTitle")} placeholder="Enter Account Title" className={errors.accountTitle ? inputError : inputNormal} style={{ fontFamily: "var(--font-poppins)" }} />
                    {errors.accountTitle && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.accountTitle}</p>}
                </div>

                {/* Account Number */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Account Number <span className="text-red-400">*</span></label>
                    <input type="text" value={data.accountNumber} onChange={handleChange("accountNumber")} placeholder="Enter Account Number" className={errors.accountNumber ? inputError : inputNormal} style={{ fontFamily: "var(--font-poppins)" }} />
                    {errors.accountNumber && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.accountNumber}</p>}
                </div>

                {/* Branch Code */}
                <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Branch Code <span className="text-red-400">*</span></label>
                    <input type="text" value={data.branchCode} onChange={handleChange("branchCode")} placeholder="Enter Branch Code" className={errors.branchCode ? inputError : inputNormal} style={{ fontFamily: "var(--font-poppins)" }} />
                    {errors.branchCode && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.branchCode}</p>}
                </div>

                {/* IBAN */}
                <div className="md:col-span-2">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>IBAN <span className="text-red-400">*</span></label>
                    <input type="text" value={data.iban} onChange={handleChange("iban")} placeholder="Enter IBAN" className={errors.iban ? inputError : inputNormal} style={{ fontFamily: "var(--font-poppins)" }} />
                    {errors.iban && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.iban}</p>}
                </div>
            </div>

            {/* Upload zone */}
            <div className="mt-5">
                <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Bank Statement (optional)</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
                {data.bankStatementFile ? (
                    <div className="relative group w-full border border-[#0092FF]/30 rounded-2xl p-4 bg-[#0092FF]/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0092FF]/20 flex items-center justify-center text-[#0092FF]">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p
                                className="text-xs font-semibold text-gray-900 truncate"
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {data.bankStatementFile.name}
                            </p>
                            <p
                                className="text-[10px] text-gray-500"
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {(data.bankStatementFile.size / 1024).toFixed(2)} KB
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onChange({ ...data, bankStatementFile: null })}
                            className="p-1 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-md transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0] ?? null); }}
                        className={`w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center gap-3 transition-all ${dragOver ? "border-[#0092FF] bg-[#0092FF]/5" : "border-[#0092FF]/40 hover:border-[#0092FF] hover:bg-[#0092FF]/5"}`}
                    >
                        <CloudUpload className="w-9 h-9 text-[#0092FF]" />
                        <span className="text-sm font-semibold text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>Upload Image</span>
                    </button>
                )}
                {errors.bankStatementFile && <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>{errors.bankStatementFile}</p>}
                <p className="text-xs text-center text-gray-400 mt-2" style={{ fontFamily: "var(--font-poppins)" }}>Allow image files, JPG and PNG</p>
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
                    className="h-12 w-full sm:w-auto sm:px-12 order-1 sm:order-2 bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 font-poppins active:scale-95"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
