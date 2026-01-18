"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    subtitle: "Best Deal Online on smart watches",
    title: "SMART WEARABLE.",
    offer: "UP to 80% OFF",
    image: "/p-1.jpg",
  },
  {
    id: 2,
    subtitle: "Capture Every Moment",
    title: "DSLR CAMERAS.",
    offer: "UP to 50% OFF",
    image: "/p-2.jpg",
  },
  {
    id: 3,
    subtitle: "Power Up Your Gaming",
    title: "GAMING LAPTOPS.",
    offer: "UP to 40% OFF",
    image: "/p-3.jpg",
  },
  {
    id: 4,
    subtitle: "Fun for the Little Ones",
    title: "KIDS TOYS.",
    offer: "UP to 60% OFF",
    image: "/p-4.jpg",
  },
  {
    id: 5,
    subtitle: "Style That Speaks",
    title: "DESIGNER BAGS.",
    offer: "UP to 35% OFF",
    image: "/p-5.jpg",
  },
  {
    id: 6,
    subtitle: "Glow Like Never Before",
    title: "BEAUTY PRODUCTS.",
    offer: "UP to 70% OFF",
    image: "/p-6.jpg",
  },
  {
    id: 7,
    subtitle: "Upgrade Your Space",
    title: "HOME FURNITURE.",
    offer: "UP to 45% OFF",
    image: "/p-7.jpg",
  },
];

export function SmartWearableBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const currentData = slides[currentSlide];

  return (
    <motion.section
      className='w-full py-12 relative max-w-7xl mx-auto'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* LEFT ARROW */}
      <motion.button
        onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
        className='absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ChevronLeft className='w-5 h-5 text-blue-500' />
      </motion.button>

      {/* RIGHT ARROW */}
      <motion.button
        onClick={() =>
          setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1))
        }
        className='absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ChevronRight className='w-5 h-5 text-blue-500' />
      </motion.button>

      {/* Main Banner - Full Width */}
      <div className='mx-auto'>
        <motion.div
          className='relative w-full overflow-hidden'
          style={{
            height: "307.652px",
            borderRadius: "15.577px",
            background: "#212844",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Globe Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src='/globe.png'
              alt='Globe background'
              width={496}
              height={308}
              className='absolute'
              style={{
                right: "0px",
                top: "0px",
              }}
            />
          </motion.div>

          {/* Content */}
          <div className='relative z-10 flex h-full'>
            {/* Left Text Content */}
            <div className='flex-1 flex flex-col justify-center pl-16 pr-8'>
              {/* First Heading */}
              <AnimatePresence mode='wait'>
                <motion.p
                  key={`subtitle-${currentSlide}`}
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-poppins)",
                    fontSize: "29.207px",
                    fontWeight: 600,
                    lineHeight: "29.207px",
                    marginBottom: "12px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentData.subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Second Heading - Main */}
              <AnimatePresence mode='wait'>
                <motion.h2
                  key={`title-${currentSlide}`}
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-poppins)",
                    fontSize: "61.336px",
                    fontWeight: 700,
                    lineHeight: "61.336px",
                    marginBottom: "12px",
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentData.title}
                </motion.h2>
              </AnimatePresence>

              {/* Third Text */}
              <AnimatePresence mode='wait'>
                <motion.p
                  key={`offer-${currentSlide}`}
                  style={{
                    color: "#FFF",
                    fontFamily: "var(--font-poppins)",
                    fontSize: "29.207px",
                    fontWeight: 600,
                    lineHeight: "29.207px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {currentData.offer}
                </motion.p>
              </AnimatePresence>

              {/* Pagination Dots */}
              <div className='flex items-center gap-2 mt-8'>
                {slides.map((_, i) => (
                  <motion.div
                    key={i}
                    className='cursor-pointer'
                    onClick={() => setCurrentSlide(i)}
                    style={{
                      width: i === currentSlide ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background:
                        i === currentSlide
                          ? "#FFF"
                          : "rgba(255, 255, 255, 0.5)",
                      transition: "all 0.3s ease",
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div
              className='relative flex items-center justify-center'
              style={{ width: "45%" }}
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`image-${currentSlide}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={currentData.image}
                    alt={currentData.title}
                    width={280}
                    height={320}
                    className='object-contain z-20 relative'
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
