"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useConfigStore } from "@/lib/store/configStore";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const { searchItems, isSearchLoading, fetchSearchItems, selectedCountry } = useConfigStore();

    useEffect(() => {
        if (query) {
            const currencyCode = selectedCountry?.currency?.shortCode || "AED";
            fetchSearchItems(query, currencyCode);
        }
    }, [query, fetchSearchItems, selectedCountry]);

    return (
        <main className="w-full px-4 pt-10 pb-20 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Page Header */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                                Search Results
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                {isSearchLoading ? (
                                    "Searching..."
                                ) : (
                                    <>
                                        Showing {searchItems.length} results for <span className="text-[#0092FF]">&quot;{query}&quot;</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Results Grid */}
                {isSearchLoading ? (
                    <div className="py-40 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#0092FF]" />
                        <p className="text-lg font-bold">Finding the best products for you...</p>
                    </div>
                ) : searchItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                        {searchItems.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard
                                    product={{
                                        id: String(product.id),
                                        listingId: product.listingId,
                                        itemId: product.id,
                                        name: product.name,
                                        image: product.icon || "/p-1.jpg",
                                        price: product.price,
                                        brand: product.brand || (product.category?.name?.split(' ')[0]) || "ESSENTIALS",
                                        rating: product.rating || 0,
                                        reviews: 0,
                                        currencyCode: product.currencyCode,
                                        originalPrice: product.originalPrice,
                                        isPromotionApplied: product.isPromotionApplied,
                                        stockMessage: product.stockMessage
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 flex flex-col items-center justify-center text-center px-4"
                    >
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-[32px] flex items-center justify-center mb-8 border border-gray-100 dark:border-gray-800">
                            <Search className="w-10 h-10 text-gray-200 dark:text-gray-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No results found</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                            We couldn&apos;t find anything matching &quot;{query}&quot;. Try checking for typos or using more general terms.
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-[#FBFCFD] dark:bg-gray-950 font-poppins">
            <CategoryNavBar />
            <Suspense fallback={
                <div className="py-40 flex flex-col items-center justify-center text-gray-400">
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#0092FF]" />
                    <p className="text-lg font-bold">Loading search...</p>
                </div>
            }>
                <SearchContent />
            </Suspense>
        </div>
    );
}
