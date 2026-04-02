"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { VendorStore } from "@/types/vendor";
import { VendorStoreCard } from "./VendorStoreCard";
import { Loader2, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VendorStoreList() {
    const [vendors, setVendors] = useState<VendorStore[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVendors = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.getAllVendors();
            if (response?.data?.items) {
                setVendors(response.data.items);
            }
        } catch (err: any) {
            console.error("Failed to fetch vendors:", err);
            setError(err.message || "Something went wrong while fetching stores.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:px-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 dark:border-gray-800 pb-10">
                <div className="space-y-2">
                    <nav className="flex items-center gap-2 text-[11px] font-bold text-[#0092FF] uppercase tracking-[0.25em]">
                        <span>Mega Mart Stores</span>
                        <span className="text-gray-200">/</span>
                        <span className="opacity-60">Browse Vendors</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Vendor Showcase
                    </h1>
                    <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
                        Explore the finest stores curated for your lifestyle. 
                        Follow your favorites to stay updated on their latest collections.
                    </p>
                </div>
                
                {/* Search / Filter mockup */}
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0092FF] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Find a store..."
                            className="pl-11 pr-6 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full text-sm font-medium w-64 focus:outline-none focus:ring-2 focus:ring-[#0092FF]/20 transition-all shadow-sm"
                        />
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* List Content */}
            {isLoading ? (
                <div className="py-40 flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                        <div className="w-16 h-16 border-4 border-[#0092FF]/20 border-t-[#0092FF] rounded-full animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Curating Stores</h3>
                    <p className="text-sm font-medium text-gray-400 mt-1 animate-pulse">Scanning the marketplace...</p>
                </div>
            ) : error ? (
                <div className="py-32 bg-red-50/10 rounded-[40px] border border-dashed border-red-200 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-10 h-10 text-red-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-900 mb-3">Service Interruption</h2>
                    <p className="text-red-500 max-w-sm mx-auto font-medium">
                        {error}
                    </p>
                    <button 
                        onClick={fetchVendors}
                        className="mt-8 px-8 py-3 bg-red-500 text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                    >
                        Try Again
                    </button>
                </div>
            ) : vendors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 items-start">
                    {vendors.map((vendor) => (
                        <VendorStoreCard key={vendor.storeId} vendor={vendor} />
                    ))}
                </div>
            ) : (
                <div className="py-32 bg-gray-50/50 dark:bg-gray-900/30 rounded-[40px] border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-10 h-10 text-gray-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">No Vendors Found</h2>
                    <p className="text-gray-500 max-w-sm mx-auto font-medium">
                        We couldn't find any vendors matching your criteria at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}
