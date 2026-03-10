"use client";

import { PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressSelectorProps {
    isLoading: boolean;
    addresses: any[];
    selectedAddress: number;
    onSelectAddress: (index: number) => void;
    onAddNew: () => void;
}

export const AddressSelector = ({ isLoading, addresses, selectedAddress, onSelectAddress, onAddNew }: AddressSelectorProps) => {

    return (
        <div className="bg-white rounded-[32px] p-4 sm:p-6 border border-gray-50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Delivered To:</h3>
                <button
                    onClick={onAddNew}
                    className="text-[#0092FF] p-1 rounded-full border border-blue-100 hover:bg-blue-50 transition-colors"
                >
                    <PlusCircle className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-3">
                {isLoading ? (
                    <div className="py-8 flex justify-center">
                        <Loader2 className="w-6 h-6 text-[#0092FF] animate-spin" />
                    </div>
                ) : addresses.length > 0 ? (
                    addresses.map((addr, idx) => (
                        <button
                            key={addr.id}
                            onClick={() => onSelectAddress(idx)}
                            className={cn(
                                "w-full p-3 sm:p-4 rounded-2xl border transition-all text-left flex items-start justify-between group",
                                selectedAddress === idx
                                    ? "border-[#0092FF] bg-[#F0F7FF]"
                                    : "border-gray-100 hover:border-blue-200"
                            )}
                        >
                            <div className="space-y-1 pr-4">
                                <p className={cn(
                                    "font-bold text-sm",
                                    selectedAddress === idx ? "text-gray-900" : "text-gray-700"
                                )}>{addr.city}</p>
                                <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                                    {addr.address}
                                </p>
                            </div>
                            <div className={cn(
                                "w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all",
                                selectedAddress === idx
                                    ? "border-[#0092FF]"
                                    : "border-gray-200 group-hover:border-blue-200"
                            )}>
                                {selectedAddress === idx && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#0092FF]" />
                                )}
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="p-4 bg-gray-50 rounded-2xl text-center">
                        <p className="text-xs text-gray-400 font-medium">No saved address found.</p>
                        <button
                            onClick={onAddNew}
                            className="text-[10px] text-[#0092FF] font-bold hover:underline mt-1 block w-full"
                        >
                            Add Address
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
