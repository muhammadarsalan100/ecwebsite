"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string | StaticImageData;
  price: number;
  reviews: string;
  rating: number;
  almostSoldOut?: boolean;
}

interface AllProductsProps {
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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

export function AllProducts({ products }: AllProductsProps) {
  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        {/* Title */}
        <motion.h2
          className='mb-10 text-[32px] font-semibold text-black'
          style={{ fontFamily: "var(--font-poppins)" }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          All Our Products
        </motion.h2>

        {/* Products Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[54px]'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className='cursor-pointer bg-white rounded-2xl shadow-[0_36px_82px_0_rgba(0,0,0,0.06)] px-[22px] pt-[13px] pb-8 flex flex-col h-full max-w-sm mx-auto w-full'
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 40px 90px 0 rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <Link href={`/product/${product.id}`} className="block h-full w-full">
                {/* Product Image */}
                <div className='relative w-full aspect-[3/2] mb-4 bg-[#F5F5F5] rounded-[9px] min-h-[200px]'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-contain p-2'
                  />
                </div>

                {/* Product Info */}
                <div className='flex items-start justify-between'>
                  <div>
                    {/* Product Name */}
                    <h3
                      className='text-[#484848] text-[18px] font-medium leading-normal'
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {product.name}
                    </h3>

                    {/* Brand Name */}
                    <p
                      className='text-[#8A8A8A] text-[11px] font-medium leading-[11px] mt-1'
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {product.brand}
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className='flex items-center gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < product.rating
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "fill-gray-200 text-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Customer Reviews */}
                <p
                  className='mt-2 text-[#484848] text-[11px] font-medium leading-normal'
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  ({product.reviews}) Customer Reviews
                </p>

                {/* Price and Sold Out */}
                <div className='flex items-center justify-between mt-6'>
                  <p
                    className='text-[#484848] text-[22px] font-medium leading-[18px] tracking-tight'
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    ${product.price.toFixed(2)}
                  </p>

                  {product.almostSoldOut && (
                    <p
                      className='text-[#FF4646] text-[11px] font-normal leading-[18px] tracking-tight text-right'
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      Almost Sold Out
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className='flex justify-center mt-10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            className='text-white font-medium hover:opacity-90 transition-opacity bg-[#0092FF] shadow-[0_18px_31px_0_rgba(0,146,255,0.15)]'
            style={{
              width: "186px",
              height: "50px",
              borderRadius: "9px",
              fontFamily: "var(--font-poppins)",
              fontSize: "14px",
            }}
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
