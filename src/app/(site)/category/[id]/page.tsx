"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useConfigStore } from "@/lib/store/configStore";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { Loader2, LayoutGrid, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const subId = searchParams.get("sub");
    
    // Determine which ID to use for fetching
    const activeId = subId || id;

    const { items, isItemsLoading, fetchCatalogItems, selectedCountry, categories, fetchCategories } = useConfigStore();

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [categories.length, fetchCategories]);

    useEffect(() => {
        const countryCode = selectedCountry?.shortCode || "UAE";
        if (activeId) {
            fetchCatalogItems(countryCode, activeId);
        }
    }, [activeId, selectedCountry, fetchCatalogItems]);

    const activeCategory = categories.find(c => String(c.id) === id);
    const activeSubcategory = activeCategory?.subCategories?.find(s => String(s.id) === subId);
    
    const pageTitle = activeSubcategory ? activeSubcategory.name : (activeCategory ? activeCategory.name : "Category");

    return (
        <div className="min-h-screen bg-[#FBFCFD] dark:bg-gray-950 font-poppins">
            <CategoryNavBar />

            <main className="w-full px-4 pt-12 pb-20 md:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-[#0092FF] uppercase tracking-[0.2em]">
                                    {activeCategory && activeSubcategory && (
                                        <>
                                            <span>{activeCategory.name}</span>
                                            <span className="text-gray-300">/</span>
                                        </>
                                    )}
                                    <span>Browse Collection</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                                    {pageTitle}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
                                    Discover our curated selection of premium {pageTitle.toLowerCase()} products, 
                                    handpicked for quality and style.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 rounded-full shadow-lg text-sm font-bold text-white hover:bg-black transition-all">
                                    <LayoutGrid className="w-4 h-4" />
                                    Sort
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Results Grid */}
                    {isItemsLoading ? (
                        <div className="py-40 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#0092FF]" />
                            <p className="text-lg font-bold tracking-tight">Curating your collection...</p>
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ProductCard
                                        product={{
                                            id: String(item.id),
                                            name: item.name,
                                            image: item.icon || (item.images?.length > 0 ? item.images[0].url : "/p-1.jpg"),
                                            price: item.price,
                                            brand: item.vendor?.fullName || "ZRGOTH Shop",
                                            rating: item.rating || 0,
                                            reviews: 0,
                                            currencyCode: item.currencyCode,
                                            originalPrice: item.originalPrice,
                                            isPromotionApplied: item.isPromotionApplied,
                                            stockMessage: item.stockMessage
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 bg-white rounded-[32px] border border-gray-100 flex flex-col items-center justify-center text-center px-4"
                        >
                            <div className="w-20 h-20 bg-[#F3F9FF] rounded-full flex items-center justify-center mb-6">
                                <LayoutGrid className="w-8 h-8 text-[#0092FF]" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                                We're currently restocking this category. Please check back soon or explore our other collections.
                            </p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
