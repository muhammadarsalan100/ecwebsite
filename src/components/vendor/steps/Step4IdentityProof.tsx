"use client";

import { useRef, useState } from "react";
import { CloudUpload, X, CheckCircle2 } from "lucide-react";
import { VendorStepIndicator } from "@/components/vendor/VendorStepIndicator";
import { vendorStep4Schema } from "@/schemas/vendor.schema";

export interface Step4Data {
    // Passport
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportImage: File | null;
    // ID Card
    idCardIssueDate: string;
    idCardExpiryDate: string;
    idCardNumber: string;
    idCardFrontImage: File | null;
    idCardBackImage: File | null;
}

interface Step4IdentityProofProps {
    data: Step4Data;
    onChange: (data: Step4Data) => void;
    onDone: () => void;
    onBack: () => void;
    isLoading?: boolean;
}

type Errors = Partial<Record<keyof Step4Data, string>>;

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase =
    "w-full h-[50px] rounded-xl border bg-white px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 transition-all appearance-none";
const inputNormal =
    `${inputBase} border-gray-200 focus:ring-[#0092FF]/30 focus:border-[#0092FF]`;
const inputError =
    `${inputBase} border-red-400 focus:ring-red-300/30 focus:border-red-400`;
const labelClass = "block text-xs text-gray-500 mb-1.5";
const errorClass = "mt-1.5 text-xs text-red-500";

// ─── Reusable Upload Box ──────────────────────────────────────────────────────

function UploadBox({
    label,
    file,
    onFile,
    error,
}: {
    label: string;
    file: File | null;
    onFile: (f: File | null) => void;
    error?: string;
}) {
    const ref = useRef<HTMLInputElement>(null);
    const [drag, setDrag] = useState(false);

    const handleFileChange = (incomingFile: File | null) => {
        if (
            incomingFile &&
            !["image/jpeg", "image/png"].includes(incomingFile.type)
        ) {
            return;
        }
        onFile(incomingFile);
    };

    return (
        <div className="flex-1">
            {label && (
                <p className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                    {label}
                </p>
            )}
            <input
                ref={ref}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            />
            {file ? (
                <div className="relative group w-full border border-[#0092FF]/30 rounded-2xl p-4 bg-[#0092FF]/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0092FF]/20 flex items-center justify-center text-[#0092FF]">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p
                            className="text-xs font-semibold text-gray-900 truncate"
                            style={{ fontFamily: "var(--font-poppins)" }}
                        >
                            {file.name}
                        </p>
                        <p
                            className="text-[10px] text-gray-500"
                            style={{ fontFamily: "var(--font-poppins)" }}
                        >
                            {(file.size / 1024).toFixed(2)} KB
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onFile(null)}
                        className="p-1 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-md transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => ref.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDrag(false);
                        handleFileChange(e.dataTransfer.files?.[0] ?? null);
                    }}
                    className={`w-full border-2 border-dashed rounded-2xl py-7 flex flex-col items-center gap-2 transition-all ${drag
                        ? "border-[#0092FF] bg-[#0092FF]/5"
                        : error
                            ? "border-red-300 bg-red-50/30"
                            : "border-[#0092FF]/40 hover:border-[#0092FF] hover:bg-[#0092FF]/5"
                        }`}
                >
                    <CloudUpload
                        className={`w-8 h-8 ${error ? "text-red-400" : "text-[#0092FF]"}`}
                    />
                    <span
                        className="text-sm font-semibold text-gray-600"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Upload Image
                    </span>
                </button>
            )}
            {error && (
                <p className={errorClass} style={{ fontFamily: "var(--font-poppins)" }}>
                    {error}
                </p>
            )}
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Step4IdentityProof({
    data,
    onChange,
    onDone,
    onBack,
    isLoading = false,
}: Step4IdentityProofProps) {
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const set = (field: keyof Step4Data) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        const newData = { ...data, [field]: value };
        onChange(newData);

        if (submitted) {
            const result = vendorStep4Schema.safeParse(newData);
            if (!result.success) {
                const fieldError = result.error.issues.find(err => err.path[0] === field)?.message;
                setErrors(prev => ({ ...prev, [field]: fieldError }));
            } else {
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        }
    };

    const setFile = (field: keyof Step4Data) => (file: File | null) => {
        const newData = { ...data, [field]: file };
        onChange(newData);

        if (submitted) {
            const result = vendorStep4Schema.safeParse(newData);
            if (!result.success) {
                const fieldError = result.error.issues.find(err => err.path[0] === field)?.message;
                setErrors(prev => ({ ...prev, [field]: fieldError }));
            } else {
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        }
    };

    const handleDone = () => {
        setSubmitted(true);
        const result = vendorStep4Schema.safeParse(data);

        if (!result.success) {
            const newErrors: Errors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as keyof Step4Data] = err.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onDone();
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="mb-6">
                    <h2
                        className="text-2xl font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Identity Proof
                    </h2>
                    <p
                        className="text-sm text-gray-400 mt-1"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Verify your identity
                    </p>
                </div>

                <VendorStepIndicator currentStep={4} />

                {/* ── Passport Section ── */}
                <div className="mb-8">
                    <h3
                        className="text-base font-bold text-[#0092FF] mb-4"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Passport Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                        <div>
                            <label
                                className={labelClass}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                Passport Number <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.passportNumber}
                                onChange={set("passportNumber")}
                                placeholder="Enter Passport Number"
                                className={errors.passportNumber ? inputError : inputNormal}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            />
                            {errors.passportNumber && (
                                <p
                                    className={errorClass}
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {errors.passportNumber}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className={labelClass}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                Issue Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.passportIssueDate}
                                onChange={set("passportIssueDate")}
                                className={errors.passportIssueDate ? inputError : inputNormal}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            />
                            {errors.passportIssueDate && (
                                <p
                                    className={errorClass}
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {errors.passportIssueDate}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className={labelClass}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                Expiry Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.passportExpiryDate}
                                onChange={set("passportExpiryDate")}
                                className={errors.passportExpiryDate ? inputError : inputNormal}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            />
                            {errors.passportExpiryDate && (
                                <p
                                    className={errorClass}
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {errors.passportExpiryDate}
                                </p>
                            )}
                        </div>
                    </div>
                    <UploadBox
                        label="Passport Image *"
                        file={data.passportImage}
                        onFile={setFile("passportImage")}
                        error={errors.passportImage}
                    />
                </div>

                {/* ── ID Card Section ── */}
                <div className="pt-6 border-t border-gray-100">
                    <h3
                        className="text-base font-bold text-[#0092FF] mb-4"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        ID Card
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                        <div className="lg:col-span-1">
                            <label
                                className={labelClass}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                Identity Number <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.idCardNumber}
                                onChange={set("idCardNumber")}
                                placeholder="Enter Identity Number"
                                className={errors.idCardNumber ? inputError : inputNormal}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            />
                            {errors.idCardNumber && (
                                <p
                                    className={errorClass}
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {errors.idCardNumber}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className={labelClass}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                Issue Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.idCardIssueDate}
                                onChange={set("idCardIssueDate")}
                                className={errors.idCardIssueDate ? inputError : inputNormal}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            />
                            {errors.idCardIssueDate && (
                                <p
                                    className={errorClass}
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {errors.idCardIssueDate}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className={labelClass}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                Expiry Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.idCardExpiryDate}
                                onChange={set("idCardExpiryDate")}
                                className={errors.idCardExpiryDate ? inputError : inputNormal}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            />
                            {errors.idCardExpiryDate && (
                                <p
                                    className={errorClass}
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {errors.idCardExpiryDate}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <UploadBox
                            label="Upload Front Image *"
                            file={data.idCardFrontImage}
                            onFile={setFile("idCardFrontImage")}
                            error={errors.idCardFrontImage}
                        />
                        <UploadBox
                            label="Upload Back Image *"
                            file={data.idCardBackImage}
                            onFile={setFile("idCardBackImage")}
                            error={errors.idCardBackImage}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                    <button
                        onClick={onBack}
                        className="h-12 w-full sm:w-auto sm:px-8 order-2 sm:order-1 border border-gray-300 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all font-poppins active:scale-95"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleDone}
                        disabled={isLoading}
                        className="h-12 w-full sm:w-auto sm:px-12 order-1 sm:order-2 bg-[#0092FF] hover:bg-[#0081E0] disabled:bg-[#0092FF]/50 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 font-poppins flex items-center justify-center gap-2 active:scale-95"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Done"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
