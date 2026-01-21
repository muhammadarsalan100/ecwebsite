"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className='w-full overflow-hidden mt-12 mb-12 lg:mt-[150px] lg:mb-[120px]'>
      <div className='max-w-7xl mx-auto px-4 relative'>
        <div className='flex flex-col lg:flex-row items-center justify-center relative min-h-[400px] lg:min-h-[624px]'>

          {/* Left Model Image - Desktop Only */}
          <motion.div
            className='hidden lg:block absolute left-0 bottom-0'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[200px] xl:w-[281px] h-[500px] xl:h-[624px]">
              <Image
                src='/man.png'
                alt='Male Model'
                fill
                className='object-contain object-bottom'
              />
            </div>
          </motion.div>

          {/* Center Content */}
          <div className='flex flex-col items-center text-center z-10 w-full max-w-lg mx-auto py-8 lg:py-0'>
            {/* Title */}
            <motion.h2
              className='text-[#484848] text-center font-volkhov text-2xl md:text-3xl lg:text-[38.445px] font-normal leading-tight mb-4'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Subscribe To Our Newsletter
            </motion.h2>

            {/* Description */}
            <motion.p
              className='text-[#8A8A8A] text-center font-poppins text-xs md:text-[13.372px] font-normal leading-relaxed mb-6 md:mb-8'
              style={{ maxWidth: "513px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
              ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </motion.p>

            {/* Email Input Container */}
            <motion.div
              className='flex flex-col items-center gap-4 w-full p-3 bg-white rounded-lg shadow-lg'
              style={{
                maxWidth: "527px",
                boxShadow: "0 20px 50px rgba(1, 141, 242, 0.05)"
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Email Input */}
              <input
                type='email'
                placeholder='michael@ymail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full outline-none text-[#8A8A8A] font-poppins text-sm text-center p-3 bg-transparent'
              />
            </motion.div>

            {/* Subscribe Button */}
            <motion.button
              className='bg-[#0092FE] text-white font-poppins text-sm font-medium rounded-lg mt-6 shadow-[0_16px_29px_rgba(0,146,254,0.15)] hover:shadow-[0_20px_35px_rgba(0,146,254,0.25)] transition-all'
              style={{
                width: "173px",
                height: "47px",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now
            </motion.button>
          </div>

          {/* Right Model Image - Desktop Only */}
          <motion.div
            className='hidden lg:block absolute right-0 bottom-0'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[200px] xl:w-[281px] h-[500px] xl:h-[624px]">
              <Image
                src='/woman.png'
                alt='Female Model'
                fill
                className='object-contain object-bottom'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
