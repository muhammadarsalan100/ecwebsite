"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { Product } from "@/types";

import { ProductCard } from "@/components/common/ProductCard";

interface AllProductsProps {
  products: Product[];
  categoryId?: string | null;
}

import { SectionHeader } from "@/components/common/SectionHeader";

export function AllProducts({ products, categoryId }: AllProductsProps) {
  return (
    <section id="all-products" className='w-full px-4 py-8 sm:py-12 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <SectionHeader
          titleFull="All Our Products"
          variant="poppins"
          className="mb-10"
        />

        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </motion.div>

        <motion.div
          className='flex justify-center mt-8 sm:mt-10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categoryId ? (
            <Link href={`/category/${categoryId}`}>
              <motion.button
                className='text-white font-medium hover:opacity-90 transition-opacity bg-[#0092FF] shadow-[0_18px_31px_0_rgba(0,146,255,0.15)] w-[160px] sm:w-[186px] h-[45px] sm:h-[50px] rounded-[9px] font-poppins text-[13px] sm:text-[14px]'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View More
              </motion.button>
            </Link>
          ) : (
            <motion.button
              className='text-white font-medium hover:opacity-90 transition-opacity bg-[#0092FF] shadow-[0_18px_31px_0_rgba(0,146,255,0.15)] w-[160px] sm:w-[186px] h-[45px] sm:h-[50px] rounded-[9px] font-poppins text-[13px] sm:text-[14px]'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
