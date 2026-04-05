"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

import { Product } from "@/types";
import { ProductCard } from "@/components/common/ProductCard";

interface RelatedProductsProps {
    products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) {
        return (
            <div className='mb-10'>
                <motion.h2
                    className='text-3xl font-bold mb-10 text-gray-900 dark:text-white'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Related Product
                </motion.h2>

                <motion.div 
                    className='flex flex-col items-center justify-center p-12 bg-gray-50/50 dark:bg-gray-900/30 rounded-[32px] border border-dashed border-gray-200 dark:border-gray-800 text-center min-h-[300px]'
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
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
                    <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100 mb-2'>No Related Products Found</h3>
                    <p className='text-gray-500 dark:text-gray-400 max-w-sm'>
                        We couldn&apos;t find any items closely related to this product at the moment.
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className='mb-10 lg:mb-20'>
            <motion.h2
                className='text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-gray-900 dark:text-white'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Related Products
            </motion.h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8'>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            <motion.div
                className='flex justify-center mt-12'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <motion.button
                    className='px-8 py-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1 font-medium'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View More
                </motion.button>
            </motion.div>
        </div>
    );
}
