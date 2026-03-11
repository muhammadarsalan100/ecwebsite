"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Loader2, Globe, Building, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { useConfigStore } from "@/lib/store/configStore";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export const AddressModal = ({ isOpen, onClose, onSuccess, initialData }: AddressModalProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        city: "",
        addressLine1: "",
        zipCode: "",
        countryId: "" as string | number,
        stateId: "" as string | number,
    });

    // Location Data from ConfigStore
    const countries = useConfigStore((state) => state.countries);
    const states = useConfigStore((state) => state.states);
    const fetchCountries = useConfigStore((state) => state.fetchCountries);
    const fetchStates = useConfigStore((state) => state.fetchStates);

    useEffect(() => {
        if (isOpen) {
            fetchCountries();
            if (initialData?.business) {
                setFormData({
                    city: initialData.business.city || "",
                    addressLine1: initialData.business.addressLine1 || "",
                    zipCode: initialData.business.zipCode || "",
                    countryId: initialData.preferredCountryId || "",
                    stateId: initialData.business.stateId || "",
                });
                if (initialData.preferredCountryId) {
                    fetchStates(initialData.preferredCountryId);
                }
            }
        }
    }, [isOpen, initialData, fetchCountries, fetchStates]);

    const handleCountryChange = (id: string) => {
        setFormData(prev => ({ ...prev, countryId: id, stateId: "" }));
        fetchStates(id);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Mapping to the backend expected structure for business profile update
            // Since we don't have a clear "Address" object standalone, we update the account/profile
            const updateData = {
                business: {
                    addressLine1: formData.addressLine1,
                    city: formData.city,
                    zipCode: formData.zipCode,
                    stateId: formData.stateId
                },
                preferredCountryId: formData.countryId
            };

            await authService.updateBaseProfile(updateData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to save address:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0092FF]">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                                    <p className="text-xs text-gray-400 font-medium">Add or update your shipping location</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-8 py-6 space-y-5">
                            {/* Country Selection */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 ml-1">Country</label>
                                <div className="relative">
                                    <select
                                        value={formData.countryId}
                                        onChange={(e) => handleCountryChange(e.target.value)}
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-11 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none"
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* State/City Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 ml-1">State</label>
                                    <div className="relative">
                                        <select
                                            disabled={!formData.countryId}
                                            value={formData.stateId}
                                            onChange={(e) => setFormData(prev => ({ ...prev, stateId: e.target.value }))}
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-11 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none disabled:opacity-50"
                                        >
                                            <option value="">State</option>
                                            {states.map((s) => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 ml-1">City</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                            placeholder="City Name"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-11 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                        />
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Address & Zip */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 ml-1">Street Address</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.addressLine1}
                                        onChange={(e) => setFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                                        placeholder="Flat / House / Street"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 ml-1">Zip Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                                        placeholder="Postal Code"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 pb-8 pt-4">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full h-14 bg-[#0092FF] hover:bg-[#0081E0] disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    "Save Delivery Address"
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
