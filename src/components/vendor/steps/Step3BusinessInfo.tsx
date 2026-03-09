"use client";

import { useState } from "react";
import { VendorStepIndicator } from "@/components/vendor/VendorStepIndicator";
import { vendorStep3Schema } from "@/schemas/vendor.schema";
import { CountrySelectModal } from "@/components/wallet/CountrySelectModal";
import { StateSelectModal } from "@/components/wallet/StateSelectModal";
import { CitySelectModal } from "@/components/wallet/CitySelectModal";
import { ChevronDown } from "lucide-react";
import { Country, State, City } from "@/types";

export interface Step3Data {
    country: string;
    countryId?: string | number;
    zipCode: string;
    state: string;
    stateId?: string | number;
    city: string;
    cityId?: string | number;
    addressLine1: string;
    addressLine2: string;
}

interface Step3BusinessInfoProps {
    data: Step3Data;
    onChange: (data: Step3Data) => void;
    onNext: () => void;
    onBack: () => void;
}

type Errors = Partial<Record<keyof Step3Data, string>>;

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase = "w-full h-[50px] rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all";
const inputNormal = `${inputBase} border-gray-200 focus:ring-[#0092FF]/30 focus:border-[#0092FF]`;
const inputError = `${inputBase} border-red-400 focus:ring-red-300/30 focus:border-red-400`;
const labelClass = "block text-xs text-gray-500 mb-1.5";
const errorClass = "mt-1.5 text-xs text-red-500";

// ─── Component ────────────────────────────────────────────────────────────────

export function Step3BusinessInfo({ data, onChange, onNext, onBack }: Step3BusinessInfoProps) {
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const [countryId, setCountryId] = useState<string | number | null>(data.countryId || null);
    const [stateId, setStateId] = useState<string | number | null>(data.stateId || null);

    const [isCountryModalOpen, setCountryModalOpen] = useState(false);
    const [isStateModalOpen, setStateModalOpen] = useState(false);
    const [isCityModalOpen, setCityModalOpen] = useState(false);

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

    const handleSelectCountry = (country: Country) => {
        const newData = {
            ...data,
            country: country.name,
            countryId: country.id,
            state: "",
            stateId: undefined,
            city: "",
            cityId: undefined
        };
        onChange(newData);
        setCountryId(country.id);
        setStateId(null);
        if (submitted) validateField("country", country.name);
    };

    const handleSelectState = (state: State) => {
        const newData = {
            ...data,
            state: state.name,
            stateId: state.id,
            city: "",
            cityId: undefined
        };
        onChange(newData);
        setStateId(state.id);
        if (submitted) validateField("state", state.name);
    };

    const handleSelectCity = (city: City) => {
        const newData = {
            ...data,
            city: city.name,
            cityId: city.id
        };
        onChange(newData);
        if (submitted) validateField("city", city.name);
    };

    const validateField = (field: keyof Step3Data, value: string) => {
        const newData = { ...data, [field]: value };
        const result = vendorStep3Schema.safeParse(newData);
        if (!result.success) {
            const fieldError = result.error.issues.find(err => err.path[0] === field)?.message;
            setErrors(prev => ({ ...prev, [field]: fieldError }));
        } else {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
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

    const selectField = (key: keyof Step3Data, label: string, placeholder: string, onClick: () => void) => (
        <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>
                {label} <span className="text-red-400">*</span>
            </label>
            <div
                onClick={onClick}
                className={`flex items-center justify-between cursor-pointer ${errors[key] ? inputError : inputNormal}`}
                style={{ fontFamily: "var(--font-poppins)" }}
            >
                <span className={`text-sm ${data[key] ? "text-gray-800" : "text-gray-400"}`}>
                    {data[key] || placeholder}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
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
                {selectField("country", "Select Country", "Enter Country", () => setCountryModalOpen(true))}
                {field("zipCode", "ZIP / Postal Code", "Enter ZIP / Postal Code")}
                {selectField("state", "State / Region", "Enter State / Region", () => setStateModalOpen(true))}
                {selectField("city", "City / Town", "Enter City / Town", () => setCityModalOpen(true))}
                {field("addressLine1", "Address Line 1", "Enter Address Line 1")}
                {field("addressLine2", "Address Line 2", "Enter Address Line 2 (optional)", true)}
            </div>

            {/* Modals */}
            <CountrySelectModal
                isOpen={isCountryModalOpen}
                onClose={() => setCountryModalOpen(false)}
                onSelect={handleSelectCountry}
                selectedCountry={data.country}
            />
            <StateSelectModal
                isOpen={isStateModalOpen}
                onClose={() => setStateModalOpen(false)}
                onSelect={handleSelectState}
                selectedState={data.state}
                countryId={countryId || ""}
            />
            <CitySelectModal
                isOpen={isCityModalOpen}
                onClose={() => setCityModalOpen(false)}
                onSelect={handleSelectCity}
                selectedCity={data.city}
                stateId={stateId || ""}
            />

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
