"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";

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
          className='mb-10'
          style={{
            fontFamily: "var(--font-poppins)",
            fontSize: "32px",
            fontWeight: 600,
            color: "#000",
          }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our All Product
        </motion.h2>

        {/* Products Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          style={{ gap: "54px" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className='cursor-pointer'
              style={{
                maxWidth: "352.846px",
                height: "400.379px",
                borderRadius: "14.14px",
                background: "#FFF",
                boxShadow: "0 36.564px 82.27px 0 rgba(0, 0, 0, 0.06)",
                paddingLeft: "22px",
                paddingRight: "22px",
                paddingTop: "13px",
                paddingBottom: "32px",
                display: "flex",
                flexDirection: "column",
              }}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 40px 90px 0 rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 } 
              }}
            >
              {/* Product Image */}
              <div
                className='relative w-full flex-1 mb-4 '
                style={{
                  borderRadius: "9.141px",
                  background: "#F5F5F5",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-contain'
                />
              </div>

              {/* Product Info */}
              <div className='flex items-start justify-between'>
                <div>
                  {/* Product Name */}
                  <h3
                    style={{
                      color: "#484848",
                      fontFamily: "var(--font-poppins)",
                      fontSize: "18.282px",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {product.name}
                  </h3>

                  {/* Brand Name */}
                  <p
                    style={{
                      color: "#8A8A8A",
                      fontFamily: "var(--font-poppins)",
                      fontSize: "10.969px",
                      fontWeight: 500,
                      lineHeight: "10.969px",
                    }}
                  >
                    {product.brand}
                  </p>
                </div>

                {/* Star Rating */}
                <div className='flex items-center gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < product.rating
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Customer Reviews */}
              <p
                className='mt-2'
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "10.969px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                ({product.reviews}) Customer Reviews
              </p>

              {/* Price and Sold Out - 23px gap from reviews */}
              <div className='flex items-center justify-between' style={{ marginTop: "23px" }}>
                <p
                  style={{
                    color: "#484848",
                    fontFamily: "var(--font-poppins)",
                    fontSize: "21.939px",
                    fontWeight: 500,
                    lineHeight: "18.282px",
                    letterSpacing: "-0.219px",
                  }}
                >
                  ${product.price.toFixed(2)}
                </p>

                {product.almostSoldOut && (
                  <p
                    style={{
                      color: "#FF4646",
                      fontFamily: "var(--font-poppins)",
                      fontSize: "10.969px",
                      fontWeight: 400,
                      lineHeight: "18.282px",
                      letterSpacing: "-0.11px",
                      textAlign: "right",
                    }}
                  >
                    Almost Sold Out
                  </p>
                )}
              </div>
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
            className='text-white font-medium hover:opacity-90 transition-opacity'
            style={{
              width: "186.633px",
              height: "50.49px",
              borderRadius: "9.016px",
              background: "#0092FF",
              boxShadow: "0 18.032px 31.556px 0 rgba(0, 146, 255, 0.15)",
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
