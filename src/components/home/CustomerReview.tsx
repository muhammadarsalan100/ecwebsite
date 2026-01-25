"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { WomanInYellowDress, ModelWearingCollection } from "@/assets/images";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "James K.",
    occupation: "Traveler",
    review: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
    image: ModelWearingCollection,
  },
  {
    id: 2,
    name: "Sarah M.",
    occupation: "Designer",
    review: "This is exactly what I was looking for. Thank you for making it pleasant and most of all hassle free! All products are great.",
    rating: 5,
    image: WomanInYellowDress,
  },
  {
    id: 3,
    name: "John W.",
    occupation: "Developer",
    review: "Amazing quality and fast delivery. The customer service was exceptional. Highly recommend to everyone!",
    rating: 5,
    image: ModelWearingCollection,
  },
];

export function CustomerReview() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const getVisibleReviews = () => {
    const prev = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    const next = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
    return [reviews[prev], reviews[currentIndex], reviews[next]];
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section
      className='w-full bg-[#FAFAFA] py-12 md:py-20'
      style={{
        minHeight: "522px",
      }}
    >
      <div className='max-w-7xl mx-auto px-4'>
        {/* Title */}
        <motion.h2
          className='mb-8 md:mb-16 font-poppins text-2xl md:text-[32px] font-semibold text-black'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Customer Review
        </motion.h2>

        {/* Reviews Carousel */}
        <motion.div
          className='relative flex items-center justify-center min-h-[400px] md:min-h-[350px] overflow-visible'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Review Card (Behind) - Desktop Only */}
          <div
            className='absolute hidden xl:flex items-stretch bg-white rounded-md shadow-lg overflow-hidden'
            style={{
              width: "726px",
              height: "244px",
              left: "calc(50% - 620px)",
              zIndex: 1,
              transform: "scale(0.9)",
              opacity: 0.7,
            }}
          >
            {/* Stacked Images - Left Card */}
            <div className='relative w-[160px] h-[160px] flex-shrink-0 self-center ml-[30px]'>
              <div className='absolute w-full h-full bg-[#E8E8E8] rounded-[4px] top-[12px] left-[12px] z-[1]' />
              <div className='absolute w-full h-full bg-[#F0F0F0] rounded-[4px] top-[6px] left-[6px] z-[2]' />
              <div className='relative w-full h-full rounded-[4px] z-[3] overflow-hidden'>
                <Image
                  src={visibleReviews[0].image}
                  alt={visibleReviews[0].name}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
            {/* Content - Left Card */}
            <div className='flex-1 flex flex-col justify-center px-10 py-14'>
              <p className='text-[#484848] font-poppins text-[13px] font-normal mb-3 line-clamp-3'>
                &quot;{visibleReviews[0].review}&quot;
              </p>
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < visibleReviews[0].rating
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
              <div className='w-[140px] h-[1px] bg-[#484848] mb-3' />
              <p className='text-[#484848] font-poppins text-[20px] font-normal mb-1'>
                {visibleReviews[0].name}
              </p>
              <p className='text-[#484848] font-poppins text-[11px] font-normal'>
                {visibleReviews[0].occupation}
              </p>
            </div>
          </div>

          {/* Center Review Card (Main - Elevated) - Responsive */}
          <div
            className='relative flex flex-col md:flex-row items-center md:items-stretch bg-white rounded-lg shadow-xl overflow-hidden z-10 w-full max-w-[340px] md:max-w-[700px] lg:max-w-[802px]'
            style={{
              minHeight: "325px",
            }}
          >
            {/* Stacked Images - Center Card */}
            <div className='relative w-[160px] h-[160px] md:w-[196px] md:h-[196px] flex-shrink-0 self-center mt-6 md:mt-0 md:ml-10'>
              <div className='absolute w-full h-full bg-[#E8E8E8] rounded-[4px] top-[12px] left-[12px] md:top-[16px] md:left-[16px] z-[1]' />
              <div className='absolute w-full h-full bg-[#F0F0F0] rounded-[4px] top-[6px] left-[6px] md:top-[8px] md:left-[8px] z-[2]' />
              <div className='relative w-full h-full rounded-[4px] z-[3] overflow-hidden'>
                <Image
                  src={visibleReviews[1].image}
                  alt={visibleReviews[1].name}
                  fill
                  className='object-cover'
                />
              </div>
            </div>

            {/* Content - Center Card */}
            <div className='flex-1 flex flex-col justify-center px-6 py-8 md:px-10 md:py-14 text-center md:text-left w-full'>
              {/* Review Text */}
              <p className='text-[#484848] font-poppins text-sm md:text-[13px] font-normal mb-4 leading-relaxed'>
                &quot;{visibleReviews[1].review}&quot;
              </p>

              {/* Stars */}
              <div className='flex items-center justify-center md:justify-start gap-1 mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < visibleReviews[1].rating
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>

              {/* HR */}
              <div className='w-full md:w-[187px] h-[1px] bg-[#484848] mb-4 mx-auto md:mx-0' />

              {/* Name */}
              <p className='text-[#484848] font-poppins text-xl md:text-[26px] font-normal mb-1'>
                {visibleReviews[1].name}
              </p>

              {/* Occupation */}
              <p className='text-[#484848] font-poppins text-xs md:text-[13px] font-normal'>
                {visibleReviews[1].occupation}
              </p>
            </div>
          </div>

          {/* Right Review Card (Behind) - Desktop Only */}
          <div
            className='absolute hidden xl:flex items-stretch bg-white rounded-md shadow-lg overflow-hidden'
            style={{
              width: "726px",
              height: "244px",
              right: "calc(50% - 620px)",
              zIndex: 1,
              transform: "scale(0.9)",
              opacity: 0.7,
            }}
          >
            {/* Stacked Images - Right Card */}
            <div className='relative w-[160px] h-[160px] flex-shrink-0 self-center ml-[30px]'>
              <div className='absolute w-full h-full bg-[#E8E8E8] rounded-[4px] top-[12px] left-[12px] z-[1]' />
              <div className='absolute w-full h-full bg-[#F0F0F0] rounded-[4px] top-[6px] left-[6px] z-[2]' />
              <div className='relative w-full h-full rounded-[4px] z-[3] overflow-hidden'>
                <Image
                  src={visibleReviews[2].image}
                  alt={visibleReviews[2].name}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
            {/* Content - Right Card */}
            <div className='flex-1 flex flex-col justify-center px-10 py-14'>
              <p className='text-[#484848] font-poppins text-[13px] font-normal mb-3 line-clamp-3'>
                &quot;{visibleReviews[2].review}&quot;
              </p>
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < visibleReviews[2].rating
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
              <div className='w-[140px] h-[1px] bg-[#484848] mb-3' />
              <p className='text-[#484848] font-poppins text-[20px] font-normal mb-1'>
                {visibleReviews[2].name}
              </p>
              <p className='text-[#484848] font-poppins text-[11px] font-normal'>
                {visibleReviews[2].occupation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.div
          className='flex items-center justify-center gap-4 mt-8 md:mt-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={handlePrev}
            className='w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className='w-5 h-5 text-gray-600' />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className='w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className='w-5 h-5 text-gray-600' />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
