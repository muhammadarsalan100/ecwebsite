"use client";

import Image from "next/image";
import { ChevronDown, Truck, MapPin, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useState } from "react";
import { AddressModal } from "@/components/cart/AddressModal";

interface LocationSelectorProps {
    isLocationOpen: boolean;
    setIsLocationOpen: (isOpen: boolean) => void;
    locationRef: React.RefObject<HTMLDivElement | null>;
    selectedCountry: any;
}

export function LocationSelector({
    isLocationOpen,
    setIsLocationOpen,
    locationRef,
    selectedCountry
}: LocationSelectorProps) {
    const { isAuthenticated, addresses } = useAuth();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [selectedAddressData, setSelectedAddressData] = useState<any>(null);

    const handleAddAddressClick = () => {
        setSelectedAddressData(null);
        setIsLocationOpen(false);
        setIsAddressModalOpen(true);
    };

    return (
        <>
            <div className="relative" ref={locationRef}>
                <div
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="hidden lg:flex items-center gap-3 bg-[#0080E3] rounded-2xl px-4 h-11 w-[240px] transition-all hover:bg-[#0070C6] cursor-pointer group select-none"
                >
                    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                        <Image src="/Ellipse.png" alt="Icon bg" fill className="object-contain" />
                        <Image src="/Saleperson.png" alt="Salesperson" width={14} height={14} className="relative z-10 object-contain" unoptimized />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs opacity-80">Pickup or delivery?</span>
                        <div className="flex items-center gap-1 text-sm font-bold text-white">
                            <span className="truncate max-w-[160px]">
                                {selectedCountry ? `${selectedCountry.name}` : "Select Location"}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isLocationOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-[100] overflow-hidden"
                        >
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <button className="flex flex-col items-center gap-1 group/btn">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-blue-50 group-hover/btn:border-blue-100 transition-colors">
                                        <Truck className="w-4 h-4 text-gray-600 group-hover/btn:text-[#0092FF]" />
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-600 group-hover/btn:text-[#0092FF]">Shipping</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 group/btn">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-blue-50 group-hover/btn:border-blue-100 transition-colors">
                                        <MapPin className="w-4 h-4 text-gray-600 group-hover/btn:text-[#0092FF]" />
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-600 group-hover/btn:text-[#0092FF]">Pickup</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 group/btn">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-blue-50 group-hover/btn:border-blue-100 transition-colors">
                                        <Package className="w-4 h-4 text-gray-600 group-hover/btn:text-[#0092FF]" />
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-600 group-hover/btn:text-[#0092FF]">Delivery</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {isAuthenticated && addresses.length > 0 ? (
                                    <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                                        {addresses.map((addr) => (
                                            <div 
                                                key={addr.id}
                                                className="p-3 border border-gray-100 bg-gray-50/50 rounded-2xl flex gap-3 cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group/addr"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 group-hover/addr:border-blue-100">
                                                    <MapPin className="w-4 h-4 text-[#0092FF]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="text-xs font-bold text-gray-900 truncate">{addr.label || addr.type || "Address"}</p>
                                                        <div className="flex items-center gap-1.5 shrink-0">
                                                            {addr.default && <span className="text-[8px] bg-blue-100 text-[#0092FF] px-1.5 py-0.5 rounded-full font-bold">Default</span>}
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedAddressData(addr);
                                                                    setIsAddressModalOpen(true);
                                                                    setIsLocationOpen(false);
                                                                }}
                                                                className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-[#0092FF] border border-transparent hover:border-blue-100"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{addr.building}, {addr.address}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleAddAddressClick}
                                            className="w-full py-2.5 text-[#0092FF] text-[10px] font-bold border border-dashed border-blue-200 rounded-xl hover:bg-blue-50 transition-colors mt-2"
                                        >
                                            + Add new address
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-3 border border-blue-100 bg-blue-50/30 rounded-2xl flex gap-3 transition-colors hover:border-blue-200">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <MapPin className="w-4 h-4 text-[#0092FF]" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div>
                                                <p className="text-xs font-bold text-gray-900 leading-tight">
                                                    {isAuthenticated ? "Add an Address for Shipping and Delivery" : "Sign in to add Address"}
                                                </p>
                                                <p className="text-[10px] text-gray-500 mt-0.5">
                                                    {isAuthenticated
                                                        ? (selectedCountry ? `Shopping in ${selectedCountry.name}` : "Select your location")
                                                        : "Unlock shipping and delivery options"}
                                                </p>
                                            </div>
                                            {isAuthenticated ? (
                                                <button
                                                    onClick={handleAddAddressClick}
                                                    className="w-full bg-[#0092FF] hover:bg-[#0070C6] text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                                                >
                                                    Add address
                                                </button>
                                            ) : (
                                                <Link
                                                    href="/auth"
                                                    onClick={() => setIsLocationOpen(false)}
                                                    className="w-full block text-center bg-[#0092FF] hover:bg-[#0070C6] text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                                                >
                                                    Sign in
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Address Modal - rendered at this level so it's outside the dropdown */}
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => {
                    setIsAddressModalOpen(false);
                    setSelectedAddressData(null);
                }}
                onSuccess={() => {
                    setIsAddressModalOpen(false);
                    setSelectedAddressData(null);
                }}
                initialData={selectedAddressData}
            />
        </>
    );
}
