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
