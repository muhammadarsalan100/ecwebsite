"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Loader2, Globe, Building, Landmark, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/lib/auth-context";
import { useConfigStore } from "@/lib/store/configStore";
import { addressSchema } from "@/schemas/address.schema";
import { z } from "zod";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
    /** Optional override — inject a custom API call. Receives the form values, must return a Promise. */
    onSave?: (data: any) => Promise<void>;
}

export const AddressModal = ({ isOpen, onClose, onSuccess, initialData, onSave }: AddressModalProps) => {
    const { addAddress, updateAddress } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

    // Form State
    const [formData, setFormData] = useState({
        cityId: "" as string | number,
        addressLine1: "",
        zipCode: "",
        countryId: "" as string | number,
        stateId: "" as string | number,
        label: "Home",
        building: "",
        roomNo: "",
        mobileNumber: "",
        landmark: "",
        type: 1, // Default to 1
        default: true,
        id: undefined as number | undefined,
    });

    // Location Data from ConfigStore
    const countries = useConfigStore((state) => state.countries);
    const states = useConfigStore((state) => state.states);
    const cities = useConfigStore((state) => state.cities);
    const isCitiesLoading = useConfigStore((state) => state.isCitiesLoading);
    const fetchCountries = useConfigStore((state) => state.fetchCountries);
    const fetchStates = useConfigStore((state) => state.fetchStates);
    const fetchCities = useConfigStore((state) => state.fetchCities);

    useEffect(() => {
        if (isOpen) {
            fetchCountries();
            if (initialData) {
                // Check if it's a profile object or a direct Address object
                const isProfile = !!initialData.business;
                const addrData = isProfile ? initialData.business : initialData;
                const preferredCountryId = isProfile ? initialData.preferredCountryId : initialData.countryId;

                setFormData({
                    cityId: addrData.cityId || "",
                    addressLine1: addrData.addressLine1 || addrData.address || "",
                    zipCode: addrData.zipCode || addrData.pinCode || "",
                    countryId: preferredCountryId || "",
                    stateId: addrData.stateId || "",
                    label: initialData.label || "Home",
                    building: initialData.building || "",
                    roomNo: initialData.roomNo || "",
                    mobileNumber: initialData.mobileNumber || "",
                    landmark: initialData.landmark || "",
                    type: initialData.type || 1,
                    default: initialData.default ?? true,
                    id: initialData.id,
                });

                if (preferredCountryId) fetchStates(preferredCountryId);
                if (addrData.stateId) fetchCities(addrData.stateId);
            } else {
                // Reset form for fresh creation
                setFormData({
                    cityId: "",
                    addressLine1: "",
                    zipCode: "",
                    countryId: "",
                    stateId: "",
                    label: "Home",
                    building: "",
                    roomNo: "",
                    mobileNumber: "",
                    landmark: "",
                    type: 1,
                    default: true,
                    id: undefined,
                });
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
        setError(null);
        // Run Zod validation
        const result = addressSchema.safeParse({
            countryId: formData.countryId,
            stateId: formData.stateId,
            cityId: formData.cityId,
            addressLine1: formData.addressLine1,
            mobileNumber: formData.mobileNumber,
            label: formData.label,
        });
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as string;
                if (key && !errors[key]) errors[key] = issue.message;
            });
            setFieldErrors(errors);
            return;
        }
        setFieldErrors({});
        setIsSaving(true);
        try {
            const payload = {
                data: {
                    type: isNaN(Number(formData.type)) ? formData.type : Number(formData.type),
                    countryId: Number(formData.countryId),
                    stateId: Number(formData.stateId),
                    cityId: Number(formData.cityId),
                    label: formData.label,
                    address: formData.addressLine1,
                    building: formData.building,
                    roomNo: formData.roomNo,
                    latitude: initialData?.latitude || "0",
                    longitude: initialData?.longitude || "0",
                    default: formData.default,
                    mobileNumber: formData.mobileNumber,
                    landmark: formData.landmark,
                    pinCode: formData.zipCode,
                }
            };

            const isEdit = !!formData.id;

            if (onSave) {
                await onSave(payload.data);
            } else if (isEdit) {
                await updateAddress({
                    ...initialData,
                    ...payload.data,
                    id: formData.id!,
                });
            } else {
                await addAddress(payload);
            }

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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden"
                    >
                        <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0092FF]">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{formData.id ? 'Edit Address' : 'Delivery Address'}</h2>
                                    <p className="text-xs text-gray-400 font-medium">{formData.id ? 'Modify your shipping location' : 'Add your shipping location'}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-5 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-5 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Country</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <select
                                        value={formData.countryId}
                                        onChange={(e) => { handleCountryChange(e.target.value); setFieldErrors(p => ({ ...p, countryId: undefined })); }}
                                        className={`w-full h-12 bg-gray-50 border rounded-2xl pl-11 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none ${
                                            fieldErrors.countryId ? 'border-red-400' : 'border-gray-100'
                                        } ${formData.countryId ? 'text-gray-900' : 'text-gray-400'}`}
                                    >
                                        <option value="" className="text-gray-400">Select Country</option>
                                        {countries.map((c) => (
                                            <option key={c.id} value={c.id} className="text-gray-900">{c.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {fieldErrors.countryId && <p className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.countryId}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">State</label>
                                    <div className="relative">
                                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <select
                                            disabled={!formData.countryId}
                                            value={formData.stateId}
                                            onChange={(e) => { handleStateChange(e.target.value); setFieldErrors(p => ({ ...p, stateId: undefined })); }}
                                            className={`w-full h-12 bg-gray-50 border rounded-2xl pl-11 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none disabled:opacity-50 ${
                                                fieldErrors.stateId ? 'border-red-400' : 'border-gray-100'
                                            } ${formData.stateId ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="" className="text-gray-400">State</option>
                                            {states.map((s) => (
                                                <option key={s.id} value={s.id} className="text-gray-900">{s.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                    </div>
                                    {fieldErrors.stateId && <p className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.stateId}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">City</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <select
                                            disabled={!formData.stateId || isCitiesLoading}
                                            value={formData.cityId}
                                            onChange={(e) => { setFormData(prev => ({ ...prev, cityId: e.target.value })); setFieldErrors(p => ({ ...p, cityId: undefined })); }}
                                            className={`w-full h-12 bg-gray-50 border rounded-2xl pl-11 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all appearance-none disabled:opacity-50 ${
                                                fieldErrors.cityId ? 'border-red-400' : 'border-gray-100'
                                            } ${formData.cityId ? 'text-gray-900' : 'text-gray-400'}`}
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
                                    {fieldErrors.cityId && <p className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.cityId}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Street Address</label>
                                <input
                                    type="text"
                                    value={formData.addressLine1}
                                    onChange={(e) => { setFormData(prev => ({ ...prev, addressLine1: e.target.value })); setFieldErrors(p => ({ ...p, addressLine1: undefined })); }}
                                    placeholder="Flat / House / Street"
                                    className={`w-full h-12 bg-gray-50 border rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all ${
                                        fieldErrors.addressLine1 ? 'border-red-400' : 'border-gray-100'
                                    }`}
                                />
                                {fieldErrors.addressLine1 && <p className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.addressLine1}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Building name</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={formData.building}
                                            onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                                            placeholder="Building Name"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Room / Apt No</label>
                                    <input
                                        type="text"
                                        value={formData.roomNo}
                                        onChange={(e) => setFormData(prev => ({ ...prev, roomNo: e.target.value }))}
                                        placeholder="Room No"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Label (e.g. Home, Office)</label>
                                    <input
                                        type="text"
                                        value={formData.label}
                                        onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                                        placeholder="Home / Office"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Mobile number</label>
                                    <input
                                        type="text"
                                        value={formData.mobileNumber}
                                        onChange={(e) => { setFormData(prev => ({ ...prev, mobileNumber: e.target.value })); setFieldErrors(p => ({ ...p, mobileNumber: undefined })); }}
                                        placeholder="Mobile Number"
                                        className={`w-full h-12 bg-gray-50 border rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all ${
                                            fieldErrors.mobileNumber ? 'border-red-400' : 'border-gray-100'
                                        }`}
                                    />
                                    {fieldErrors.mobileNumber && <p className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.mobileNumber}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Landmark</label>
                                <div className="relative">
                                    <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={formData.landmark}
                                        onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                                        placeholder="Near Landmark"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 ml-1">Zip Code / Pin Code</label>
                                <input
                                    type="text"
                                    value={formData.zipCode}
                                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                                    placeholder="Postal Code"
                                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 focus:border-[#0092FF] transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="default-address"
                                    checked={formData.default}
                                    onChange={(e) => setFormData(prev => ({ ...prev, default: e.target.checked }))}
                                    className="w-4 h-4 text-[#0092FF] border-gray-300 rounded focus:ring-[#0092FF]"
                                />
                                <label htmlFor="default-address" className="text-xs font-semibold text-gray-700">Set as default address</label>
                            </div>
                        </div>

                        <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2 sm:pt-4">
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
                                    formData.id ? "Update Address" : "Save Delivery Address"
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
