"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { Product } from "@/types";

interface AllProductsProps {
  products: Product[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    className='cursor-pointer bg-white rounded-2xl shadow-[0_36px_82px_0_rgba(0,0,0,0.06)] px-4 sm:px-[22px] pt-3 sm:pt-[13px] pb-6 sm:pb-8 flex flex-col h-full max-w-sm mx-auto w-full'
    variants={itemVariants}
    whileHover={{
      y: -10,
      boxShadow: "0 40px 90px 0 rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }}
  >
    <Link href={`/product/${product.id}`} className="block h-full w-full">
      <div className='relative w-full aspect-[3/2] mb-3 sm:mb-4 bg-[#F5F5F5] rounded-[9px] min-h-[180px] sm:min-h-[200px]'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-contain p-2'
        />
      </div>

      <div className='flex items-start justify-between gap-2'>
        <div className="flex-1 min-w-0">
          <h3 className='text-[#484848] text-base sm:text-[18px] font-medium leading-normal font-poppins truncate'>
            {product.name}
          </h3>
          <p className='text-[#8A8A8A] text-[10px] sm:text-[11px] font-medium leading-[11px] mt-1 font-poppins'>
            {product.brand}
          </p>
        </div>

        <div className='flex items-center gap-0.5 shrink-0'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < product.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"}`}
            />
          ))}
        </div>
      </div>

      <p className='mt-2 text-[#484848] text-[10px] sm:text-[11px] font-medium leading-normal font-poppins'>
        ({product.reviews}) Customer Reviews
      </p>

      <div className='flex items-center justify-between mt-4 sm:mt-6'>
        <p className='text-[#484848] text-lg sm:text-[22px] font-medium leading-[18px] tracking-tight font-poppins'>
          ${product.price.toFixed(2)}
        </p>

        {product.almostSoldOut && (
          <p className='text-[#FF4646] text-[10px] sm:text-[11px] font-normal leading-[18px] tracking-tight text-right font-poppins'>
            Almost Sold Out
          </p>
        )}
      </div>
    </Link>
  </motion.div>
);

export function AllProducts({ products }: AllProductsProps) {
  return (
    <section id="all-products" className='w-full px-4 py-8 sm:py-12 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <motion.h2
          className='mb-6 sm:mb-10 text-2xl sm:text-[32px] font-semibold text-black font-poppins'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          All Our Products
        </motion.h2>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-[54px]'
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
          <motion.button
            className='text-white font-medium hover:opacity-90 transition-opacity bg-[#0092FF] shadow-[0_18px_31px_0_rgba(0,146,255,0.15)] w-[160px] sm:w-[186px] h-[45px] sm:h-[50px] rounded-[9px] font-poppins text-[13px] sm:text-[14px]'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
