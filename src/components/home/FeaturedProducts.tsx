"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";

import { FeaturedProductCard } from "@/types";

interface FeaturedProductsProps {
  products: FeaturedProductCard[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className='w-full px-4 py-8 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className='relative overflow-hidden group cursor-pointer rounded-[20px]'
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Product Image */}
              <div className='relative h-72 md:h-80'>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                />

                {/* Wishlist Button - Prevent navigation when clicked */}
                <motion.button
                  className='absolute top-4 left-4 w-10 h-10 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors z-10 rounded-[20px] border-[0.5px] border-black'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className='w-5 h-5 text-gray-600' />
                </motion.button>

                {/* Buy Now Button - Prevent navigation when clicked (or keep it if it goes to product page anyway) */}
                <motion.button
                  className='absolute top-4 right-4 px-5 py-2.5 bg-transparent text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors whitespace-nowrap z-10 rounded-[20px] border-[0.5px] border-black'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>

                {/* Bottom Content Overlay */}
                <motion.div
                  className='absolute bottom-4 left-4 right-4'
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className='bg-white px-4 py-3 inline-block max-w-[90%] rounded-[10px]'>
                    <p className='text-sm font-medium text-gray-900'>
                      {product.title}
                    </p>
                    {product.subtitle && (
                      <p className='text-xs text-gray-500'>{product.subtitle}</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
