"use client";

import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function PersonalDataPage() {
    const { refreshUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "************",
        streetAddress: "",
        postalCode: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authService.getAccount();
                if (response?.data) {
                    const data = response.data;
                    setFormData({
                        fullName: data.fullName || "",
                        email: data.email || "",
                        phoneNumber: data.phoneNo || "",
                        password: "************",
                        streetAddress: data.business?.addressLine1 || "",
                        postalCode: data.business?.zipCode || "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (saveStatus) setSaveStatus(null);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus(null);
        try {
            const updateData = {
                fullName: formData.fullName,
                phoneNo: formData.phoneNumber,
            };

            await authService.updateBaseProfile(updateData);
            await refreshUser();
            setSaveStatus({ type: 'success', message: 'Profile updated successfully!' });
        } catch (error: any) {
            setSaveStatus({ type: 'error', message: error.message || 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-[#0092FF] animate-spin" />
                <p className="text-gray-500 font-medium text-sm">Loading your information...</p>
            </div>
        );
    }

    const inputClass = "w-full h-14 rounded-xl border border-gray-200 bg-white px-5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0092FF] focus:border-[#0092FF] transition-all font-medium";
    const labelClass = "block text-xs font-medium text-gray-400 mb-2 px-1";

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl" style={{ fontFamily: "var(--font-poppins)" }}>
                    Identification
                </h1>
                <p className="text-gray-400 mt-1 font-medium text-xs sm:text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
                    Verify your identify
                </p>
                <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center gap-2 text-[#0092FF] text-[10px] sm:text-xs font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Only your Full Name and Phone Number can be updated in this section.</span>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8">
                {/* Full Name */}
                <div className="space-y-1">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Full Name</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange("fullName")}
                        placeholder="Enter Full Name"
                        className={inputClass}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                </div>

                {/* E-mail */}
                <div className="space-y-1">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>E-mail</label>
                    <input
                        type="email"
                        value={formData.email}
                        readOnly
                        className={cn(inputClass, "bg-gray-50/80 text-gray-400 cursor-not-allowed border-gray-100")}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Phone Number</label>
                    <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                        placeholder="+98 874 874 2345"
                        className={inputClass}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            value={formData.password}
                            readOnly
                            className={cn(inputClass, "bg-gray-50/80 text-gray-400 cursor-not-allowed border-gray-100")}
                            style={{ fontFamily: "var(--font-poppins)" }}
                        />
                    </div>
                </div>

                {/* Street Address */}
                <div className="space-y-1">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Street Address</label>
                    <input
                        type="text"
                        value={formData.streetAddress}
                        readOnly
                        placeholder="Not set"
                        className={cn(inputClass, "bg-gray-50/80 text-gray-400 cursor-not-allowed border-gray-100")}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                </div>

                {/* Postal Code */}
                <div className="space-y-1">
                    <label className={labelClass} style={{ fontFamily: "var(--font-poppins)" }}>Postal Code</label>
                    <input
                        type="text"
                        value={formData.postalCode}
                        readOnly
                        placeholder="Not set"
                        className={cn(inputClass, "bg-gray-50/80 text-gray-400 cursor-not-allowed border-gray-100")}
                        style={{ fontFamily: "var(--font-poppins)" }}
                    />
                </div>
            </div>

            {/* Status Message */}
            {saveStatus && (
                <div className={cn(
                    "flex items-center gap-2 p-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1",
                    saveStatus.type === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}>
                    {saveStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {saveStatus.message}
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-8">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-12 w-full sm:w-auto sm:px-12 bg-[#0092FF] hover:bg-[#0081E0] disabled:bg-[#0092FF]/50 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
        </div>
    );
}
