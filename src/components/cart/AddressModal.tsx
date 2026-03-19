"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Loader2, Globe, Building, Landmark, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { useConfigStore } from "@/lib/store/configStore";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
    /** Optional override — inject a custom API call. Receives the form values, must return a Promise. */
    onSave?: (data: {
        addressLine1: string;
        cityId: string | number;
        stateId: string | number;
        countryId: string | number;
        zipCode: string;
    }) => Promise<void>;
}

export const AddressModal = ({ isOpen, onClose, onSuccess, initialData, onSave }: AddressModalProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        cityId: "" as string | number,
        addressLine1: "",
        zipCode: "",
        countryId: "" as string | number,
        stateId: "" as string | number,
    });

    // Location Data from ConfigStore
    const countries = useConfigStore((state) => state.countries);
    const states = useConfigStore((state) => state.states);
    const cities = useConfigStore((state) => state.cities);
    const isCitiesLoading = useConfigStore((state) => state.isCitiesLoading);
    const isStatesLoading = useConfigStore((state) => state.isStatesLoading);
    const fetchCountries = useConfigStore((state) => state.fetchCountries);
    const fetchStates = useConfigStore((state) => state.fetchStates);
    const fetchCities = useConfigStore((state) => state.fetchCities);

    useEffect(() => {
        if (isOpen) {
            fetchCountries();
            if (initialData?.business) {
                setFormData({
                    cityId: initialData.business.cityId || "",
                    addressLine1: initialData.business.addressLine1 || "",
                    zipCode: initialData.business.zipCode || "",
                    countryId: initialData.preferredCountryId || "",
                    stateId: initialData.business.stateId || "",
                });
                if (initialData.preferredCountryId) {
                    fetchStates(initialData.preferredCountryId);
                }
                if (initialData.business.stateId) {
                    fetchCities(initialData.business.stateId);
                }
            }
        }
    }, [isOpen, initialData, fetchCountries, fetchStates, fetchCities]);

    const handleCountryChange = (id: string) => {
        setFormData(prev => ({ ...prev, countryId: id, stateId: "", cityId: "" }));
        fetchStates(id);
    };

    const handleStateChange = (id: string) => {
        setFormData(prev => ({ ...prev, stateId: id, cityId: "" }));
        if (id) fetchCities(id);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            const payload = {
                addressLine1: formData.addressLine1,
                cityId: formData.cityId,
                stateId: formData.stateId,
                countryId: formData.countryId,
                zipCode: formData.zipCode,
            };

            if (onSave) {
                // Caller-supplied API — e.g. updateAddress(id, payload)
                await onSave(payload);
            }
            // TODO: Uncomment when addAddress API endpoint is ready
            // else {
            //     // Default: create a new address via the dedicated address endpoint
            //     await authService.addAddress(payload);
            // }

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Failed to save address:", error);
            setError(error.message || "Failed to save address. Please try again.");
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
                                <label className="text-xs font-semibold text-gray-700 ml-1">Country</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <select
                                        value={formData.countryId}
                                        onChange={(e) => handleCountryChange(e.target.value)}
                                        className={`w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none ${
                                            formData.countryId ? 'text-gray-900' : 'text-gray-400'
                                        }`}
                                    >
                                        <option value="" className="text-gray-400">Select Country</option>
                                        {countries.map((c) => (
                                            <option key={c.id} value={c.id} className="text-gray-900">{c.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* State/City Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">State</label>
                                    <div className="relative">
                                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <select
                                            disabled={!formData.countryId}
                                            value={formData.stateId}
                                            onChange={(e) => handleStateChange(e.target.value)}
                                            className={`w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none disabled:opacity-50 ${
                                                formData.stateId ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                        >
                                            <option value="" className="text-gray-400">State</option>
                                            {states.map((s) => (
                                                <option key={s.id} value={s.id} className="text-gray-900">{s.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">City</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <select
                                            disabled={!formData.stateId || isCitiesLoading}
                                            value={formData.cityId}
                                            onChange={(e) => setFormData(prev => ({ ...prev, cityId: e.target.value }))}
                                            className={`w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none disabled:opacity-50 ${
                                                formData.cityId ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                        >
                                            <option value="" className="text-gray-400">
                                                {isCitiesLoading ? 'Loading...' : 'Select City'}
                                            </option>
                                            {cities.map((c) => (
                                                <option key={c.id} value={c.id} className="text-gray-900">{c.name}</option>
                                            ))}
                                        </select>
                                        {isCitiesLoading
                                            ? <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 animate-spin pointer-events-none" />
                                            : <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Address & Zip */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Street Address</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.addressLine1}
                                        onChange={(e) => setFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                                        placeholder="Flat / House / Street"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Zip Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                                        placeholder="Postal Code"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 pb-8 pt-4">
                            {error && (
                                <p className="text-sm font-medium text-red-500 text-center mb-4">
                                    {error}
                                </p>
                            )}
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
