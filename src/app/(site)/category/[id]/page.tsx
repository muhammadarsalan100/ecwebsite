"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useConfigStore } from "@/lib/store/configStore";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { ChevronDown, Check, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const subId = searchParams.get("sub");

    // Determine which ID to use for fetching
    const activeId = subId || id;

    const { items, isItemsLoading, fetchCatalogItems, selectedCountry, categories, fetchCategories } = useConfigStore();

    const sortOptions = ["Featured", "Low to High", "High to Low"];
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Featured");

    // Sorting Logic
    const sortedItems = [...items].sort((a, b) => {
        if (selectedSort === "Low to High") return a.price - b.price;
        if (selectedSort === "High to Low") return b.price - a.price;
        return 0; // Default: Featured
    });

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [categories.length, fetchCategories]);

    useEffect(() => {
        const countryCode = selectedCountry?.shortCode || "UAE";
        const currencyCode = selectedCountry?.currency?.shortCode || "AED";
        if (activeId) {
            fetchCatalogItems(countryCode, activeId, currencyCode);
        }
    }, [activeId, selectedCountry, fetchCatalogItems]);

    const activeCategory = categories.find(c => String(c.id) === id);
    const activeSubcategory = activeCategory?.subCategories?.find(s => String(s.id) === subId);

    const pageTitle = activeSubcategory ? activeSubcategory.name : (activeCategory ? activeCategory.name : "Category");

    return (
        <div className="min-h-screen bg-background dark:bg-gray-950">
            <CategoryNavBar />

            <main className="w-full px-4 pt-16 pb-24 md:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-12 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10"
                        >
                            <div className="space-y-4">
                                <nav className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-[0.25em]">
                                    {activeCategory && (
                                        <>
                                            <span className="opacity-60">{activeCategory.name}</span>
                                            <span className="text-border">/</span>
                                        </>
                                    )}
                                    <span>Browse Collection</span>
                                </nav>
                                <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                                    {pageTitle}
                                </h1>
                                <p className="text-muted-foreground font-medium max-w-2xl leading-relaxed">
                                    Discover our curated selection of premium {pageTitle.toLowerCase()} products,
                                    meticulously chosen for their quality, style, and lasting value.
                                </p>
                            </div>

                            {/* Custom Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-3 px-6 py-2.5 bg-card border border-border rounded-full shadow-sm text-sm font-bold text-foreground hover:bg-muted/50 transition-all active:scale-95 group min-w-[180px] justify-between"
                                >
                                    <span>Sort by: {selectedSort}</span>
                                    <ChevronDown className={cn("w-4 h-4 text-primary transition-transform duration-300", isSortOpen && "rotate-180")} />
                                </button>

                                <AnimatePresence>
                                    {isSortOpen && (
                                        <>
                                            {/* Backdrop for closing */}
                                            <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />

                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-2 w-full min-w-[200px] bg-card border border-border rounded-2xl shadow-2xl z-20 overflow-hidden py-2"
                                            >
                                                {sortOptions.filter(option => option !== selectedSort).map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => {
                                                            setSelectedSort(option);
                                                            setIsSortOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full px-5 py-3 text-left text-[14px] font-bold transition-all flex items-center justify-between text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                        )}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>

                    {/* Results Grid */}
                    {isItemsLoading ? (
                        <div className="py-40 flex flex-col items-center justify-center text-muted-foreground">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-foreground">Curating Selection</h3>
                            <p className="text-sm font-medium opacity-60 mt-1">Bringing you the finest items...</p>
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                            {sortedItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-32 bg-card rounded-[40px] border border-border/60 flex flex-col items-center justify-center text-center px-4 shadow-sm"
                        >
                            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8">
                                <LayoutGrid className="w-10 h-10 text-primary opacity-40" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">No products found</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed font-medium">
                                We're currently restocking this category with exclusive new arrivals. Please check back soon or explore our other collections.
                            </p>
                            <button
                                onClick={() => window.history.back()}
                                className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                Go Back
                            </button>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}

