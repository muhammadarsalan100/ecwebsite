"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

import { Product } from "@/types";

interface RelatedProductsProps {
    products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
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

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className='group cursor-pointer rounded-2xl bg-white p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 dark:bg-gray-900 overflow-hidden border border-gray-100 dark:border-gray-800'
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 mb-4'>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                            />
                        </div>

                        <div className='flex justify-between items-start mb-2'>
                            <div>
                                <h3 className='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors'>
                                    {product.name}
                                </h3>
                                <p className='text-xs text-gray-500'>{product.brand}</p>
                            </div>
                            <div
                                className='flex items-center gap-0.5'
                                aria-label={`Rated ${product.rating} stars`}
                            >
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < product.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='mb-4'>
                            <span className='text-xs text-gray-500'>
                                [{product.reviews} Customer reviews]
                            </span>
                        </div>

                        <div className='flex items-center justify-between mt-auto'>
                            <span className='text-xl font-bold text-gray-900 dark:text-white'>
                                ${product.price.toFixed(2)}
                            </span>
                            {product.soldOut && (
                                <span className='text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md'>
                                    Almost Sold Out
                                </span>
                            )}
                        </div>
                    </motion.div>
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
