"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function LeatherBagBanner() {
  return (
    <section className='w-full pt-32 pb-12' >
      <div className='mx-auto max-w-7xl' >
        <motion.div
          className='relative overflow-visible'
          style={{
            borderRadius: "36px",
            background: "#F8F8F8",
            height: "326px",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* White Globe/Circle on right side - 60px margin from right */}
          <motion.div
            className='absolute rounded-full'
            style={{
              width: "252px",
              height: "252px",
              background: "#FFF",
              right: "60px",
              top: "-60px",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Decorative Pink Circles - both to the left of image */}
          {/* First blob - larger, behind image area */}
          <motion.div
            className='absolute rounded-full'
            style={{
              width: "125px",
              height: "125px",
              background: "#F8E4E4",
              right: "280px",
              top: "20px",
              zIndex: 5,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          {/* Second blob - smaller, below and left of bigger blob */}
          <motion.div
            className='absolute rounded-full z-10'
            style={{
              width: "53px",
              height: "53px",
              background: "#F7DFF4",
              right: "425px",
              bottom: "80px",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <div className='flex flex-col md:flex-row items-center' style={{ height: "326px" }}>
            {/* Left Content */}
            <div className='flex-1 p-8 md:p-12 lg:p-16 z-10'>
              {/* Main Heading */}
              <motion.h2
                style={{
                  color: "#000",
                  fontFamily: "var(--font-readex-pro)",
                  fontSize: "34.92px",
                  fontWeight: 600,
                  lineHeight: "42.4px",
                }}
                className='mb-4'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Best Lather Bag Collection
                <br />
                For you
              </motion.h2>

              {/* Description */}
              <motion.p
                style={{
                  color: "#000",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20.1px",
                }}
                className='mb-6 max-w-md'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
                duis ultrices
              </motion.p>

              {/* Buy Now Button */}
              <motion.button
                style={{
                  width: "150px",
                  height: "46.429px",
                  borderRadius: "8.929px",
                  background: "#FCBD01",
                  boxShadow: "0 1.786px 3.571px 0 rgba(191, 151, 32, 0.25)",
                }}
                className='font-semibold text-black hover:opacity-90 transition-opacity'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Now
              </motion.button>
            </div>

            {/* Right Image - Overflowing above card */}
            <div className='relative flex-1 h-full flex items-end justify-end'>
              <motion.div 
                className='absolute bottom-0 right-8 z-20'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/ecom.png"
                  alt='Woman with leather bag'
                  width={333}
                  height={444}
                  className='object-contain'
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
