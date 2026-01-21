"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function SummerHero() {
  return (
    <section className='w-full px-4 py-6 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <motion.div
          className='relative overflow-hidden w-full'
          style={{
            borderRadius: "30px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Container Height: Responsive */}
          <div className="h-[400px] md:h-[350px] lg:h-[307px] relative w-full">
            {/* Background Image */}
            <motion.div
              className='absolute inset-0'
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Image
                src='/p-8jpg.jpg'
                alt='Summer Collection Model'
                fill
                className='object-cover object-center'
                priority
              />
              {/* Overlay gradient for text readability */}
              <div
                className='absolute inset-0 bg-black/40 md:bg-black/50'
                style={{
                  background: "linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)"
                }}
              />
            </motion.div>

            {/* Content */}
            <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-6 h-full w-full max-w-4xl mx-auto'>
              <motion.h1
                className='mb-3 md:mb-4 text-white font-normal'
                style={{
                  fontFamily: "var(--font-poppins)",
                  lineHeight: "1.2",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-3xl sm:text-4xl md:text-[51px]">Summer Arrival of Outfit</span>
              </motion.h1>

              <motion.p
                className='text-white/90 text-sm sm:text-base md:text-lg mb-6 md:mb-8 font-light max-w-xs sm:max-w-xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Discover quality fashion that reflects your style and make
                everyday enjoyable
              </motion.p>

              <motion.button
                className='group flex items-center gap-3 bg-white text-black pl-6 pr-2 py-2 rounded-full hover:bg-gray-100 transition-all duration-300'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="text-sm md:text-base font-medium"
                  style={{
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  EXPLORE PRODUCT
                </span>
                <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform'>
                  <ArrowRight className='w-4 h-4 md:w-5 md:h-5 text-white' />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
