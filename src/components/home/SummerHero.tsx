"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ModelWearingCollection } from "@/assets/images";
import { motion } from "framer-motion";

export function SummerHero() {
  return (
    <section className='w-full px-4 py-6 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <motion.div 
          className='relative overflow-hidden'
          style={{
            height: "307px",
            borderRadius: "30px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
              className='absolute inset-0' 
              style={{
                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)",
              }}
            />
          </motion.div>

          {/* Content */}
          <div className='relative z-10 flex flex-col items-center justify-center text-center px-6 h-[307px]'>
            <motion.h1 
              className='mb-4'
              style={{
                color: "#FFF",
                fontFamily: "var(--font-poppins)",
                fontSize: "51px",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Summer Arrival of Outfit
            </motion.h1>
            <motion.p 
              className='mb-8'
              style={{
                width: "410px",
                color: "#FFF",
                textAlign: "center",
                fontFamily: "var(--font-poppins)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "normal",
                opacity: 0.6,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover quality fashion that reflects your style and make
              everyday enjoyable
            </motion.p>
            <motion.button 
              className='group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                EXPLORE PRODUCT
              </span>
              <div className='w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform'>
                <ArrowRight className='w-4 h-4 text-white' />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
