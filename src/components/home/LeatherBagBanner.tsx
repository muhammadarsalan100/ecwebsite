"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function LeatherBagBanner() {
  return (
    <section className='w-full pt-12 pb-12 md:pt-32'>
      <div className='mx-auto max-w-7xl px-4 md:px-8 lg:px-12'>
        <motion.div
          className='relative overflow-visible w-full rounded-[30px]'
          style={{
            background: "#F8F8F8",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          {/* Decorative Elements - Hidden on Mobile */}
          <div className="hidden md:block">
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
          </div>

          <div className='flex flex-col md:flex-row items-center min-h-[400px] md:h-[326px]'>
            {/* Left Content */}
            <div className='flex-1 p-8 md:p-12 lg:p-16 z-10 w-full text-center md:text-left'>
              {/* Main Heading */}
              <motion.h2
                style={{
                  color: "#000",
                  fontFamily: "var(--font-readex-pro)",
                  fontWeight: 600,
                  lineHeight: "1.2",
                }}
                className='mb-4 text-2xl sm:text-3xl md:text-[34.92px]'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Best Leather Bag Collection
                <br />
                For you
              </motion.h2>

              {/* Description */}
              <motion.p
                style={{
                  color: "#000",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 400,
                  lineHeight: "1.5",
                }}
                className='mb-6 max-w-md text-sm md:text-[14px] mx-auto md:mx-0'
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
                  background: "#FCBD01",
                  boxShadow: "0 1.786px 3.571px 0 rgba(191, 151, 32, 0.25)",
                }}
                className='w-[150px] h-12 rounded-[9px] font-semibold text-black hover:opacity-90 transition-opacity'
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

            {/* Right Image - Overflowing above card on desktop, normal on mobile */}
            <div className='relative flex-1 h-[300px] md:h-full w-full flex items-end justify-center md:justify-end'>
              <motion.div
                className='relative md:absolute bottom-0 md:right-8 z-20 w-[200px] md:w-[333px]'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
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
