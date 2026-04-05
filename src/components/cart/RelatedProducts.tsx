"use client";

import { Loader2 } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface RelatedProductsProps {
    isLoading: boolean;
    products: any[];
}

export const RelatedProducts = ({ isLoading, products }: RelatedProductsProps) => {
    return (
        <div className="mt-12 sm:mt-20">
            <motion.h2 
                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 px-2 leading-tight"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Customers who viewed items in your browsing history also viewed
            </motion.h2>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div 
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 sm:py-24 bg-white dark:bg-gray-950 rounded-[24px] sm:rounded-[32px] border border-gray-100 dark:border-gray-800"
                    >
                        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#0092FF] animate-spin mb-4" />
                        <p className="text-gray-400 font-medium animate-pulse text-sm sm:text-base">Finding recommendations...</p>
                    </motion.div>
                ) : products.length > 0 ? (
                    <motion.div 
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard
                                    product={{
                                        id: String(product.id),
                                        listingId: product.listingId || 0,
                                        itemId: product.id || 0,
                                        name: product.name,
                                        price: product.price,
                                        image: (product.images && product.images[0]?.url) || product.icon || "",
                                        rating: product.rating || 5,
                                        reviews: 0,
                                        currencyCode: product.currencyCode,
                                        originalPrice: product.originalPrice,
                                        isPromotionApplied: product.isPromotionApplied
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="empty"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='flex flex-col items-center justify-center p-12 bg-gray-50/50 dark:bg-gray-900/30 rounded-[32px] border border-dashed border-gray-200 dark:border-gray-800 text-center min-h-[300px]'
                    >
                        <div className='w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-700'>
                            <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                                <path d="m3.3 7 8.7 5 8.7-5" />
                                <path d="M12 22V12" />
                                <circle cx="18" cy="18" r="3" />
                                <path d="m11 15.5 2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className='text-lg font-bold text-gray-900 dark:text-gray-100 mb-2'>No Items Found</h3>
                        <p className='text-gray-500 dark:text-gray-400 max-w-sm'>
                            We couldn&apos;t find any items in your history to generate recommendations.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
