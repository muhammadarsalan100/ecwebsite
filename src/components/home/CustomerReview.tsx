"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { WomanInYellowDress, ModelWearingCollection } from "@/assets/images";
import { motion, AnimatePresence } from "framer-motion";

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
      className='w-full'
      style={{
        background: "#FAFAFA",
        minHeight: "522px",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className='max-w-7xl mx-auto px-4'>
        {/* Title */}
        <motion.h2
          className='mb-16'
          style={{
            fontFamily: "var(--font-poppins)",
            fontSize: "32px",
            fontWeight: 600,
            color: "#000",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Customer Review
        </motion.h2>

        {/* Reviews Carousel */}
        <motion.div 
          className='relative flex items-center justify-center' 
          style={{ minHeight: "350px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Review Card (Behind) */}
          <div
            className='absolute hidden md:flex items-stretch'
            style={{
              width: "726.836px",
              height: "243.906px",
              borderRadius: "6.098px",
              background: "#FFF",
              boxShadow: "0 12.195px 36.586px 0 rgba(46, 33, 61, 0.08)",
              overflow: "hidden",
              left: "calc(50% - 550px)",
              zIndex: 1,
            }}
          >
            {/* Stacked Images */}
            <div
              className='relative'
              style={{
                width: "160px",
                height: "160px",
                flexShrink: 0,
                alignSelf: "center",
                marginLeft: "30px",
              }}
            >
              {/* Back layer */}
              <div
                className='absolute'
                style={{
                  width: "160px",
                  height: "160px",
                  background: "#E8E8E8",
                  borderRadius: "4px",
                  top: "12px",
                  left: "12px",
                  zIndex: 1,
                }}
              />
              {/* Middle layer */}
              <div
                className='absolute'
                style={{
                  width: "160px",
                  height: "160px",
                  background: "#F0F0F0",
                  borderRadius: "4px",
                  top: "6px",
                  left: "6px",
                  zIndex: 2,
                }}
              />
              {/* Front layer (main image) */}
              <div
                className='relative overflow-hidden'
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "4px",
                  zIndex: 3,
                }}
              >
                <Image
                  src={visibleReviews[0].image}
                  alt={visibleReviews[0].name}
                  width={160}
                  height={160}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            {/* Content */}
            <div className='flex-1 flex flex-col justify-center' style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "56px", paddingBottom: "56px" }}>
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "13.008px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "12px",
                }}
              >
                "{visibleReviews[0].review}"
              </p>
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < visibleReviews[0].rating
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div
                style={{
                  width: "140px",
                  height: "0.813px",
                  background: "#484848",
                  marginBottom: "12px",
                }}
              />
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {visibleReviews[0].name}
              </p>
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {visibleReviews[0].occupation}
              </p>
            </div>
          </div>

          {/* Center Review Card (Main - Elevated) */}
          <div
            className='flex items-stretch relative'
            style={{
              width: "802.448px",
              height: "325.208px",
              borderRadius: "8.13px",
              background: "#FFF",
              boxShadow: "0 16.26px 48.781px 0 rgba(46, 33, 61, 0.08)",
              overflow: "hidden",
              zIndex: 10,
            }}
          >
            {/* Stacked Images */}
            <div
              className='relative'
              style={{
                width: "196.751px",
                height: "196.751px",
                flexShrink: 0,
                alignSelf: "center",
                marginLeft: "40px",
              }}
            >
              {/* Back layer (furthest) */}
              <div
                className='absolute'
                style={{
                  width: "196.751px",
                  height: "196.751px",
                  background: "#E8E8E8",
                  borderRadius: "4px",
                  top: "16px",
                  left: "16px",
                  zIndex: 1,
                }}
              />
              {/* Middle layer */}
              <div
                className='absolute'
                style={{
                  width: "196.751px",
                  height: "196.751px",
                  background: "#F0F0F0",
                  borderRadius: "4px",
                  top: "8px",
                  left: "8px",
                  zIndex: 2,
                }}
              />
              {/* Front layer (main image) */}
              <div
                className='relative overflow-hidden'
                style={{
                  width: "196.751px",
                  height: "196.751px",
                  borderRadius: "4px",
                  zIndex: 3,
                }}
              >
                <Image
                  src={visibleReviews[1].image}
                  alt={visibleReviews[1].name}
                  width={197}
                  height={197}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 flex flex-col justify-center' style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "56px", paddingBottom: "56px" }}>
              {/* Review Text */}
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "13.008px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "16px",
                }}
              >
                "{visibleReviews[1].review}"
              </p>

              {/* Stars */}
              <div className='flex items-center gap-1 mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < visibleReviews[1].rating
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* HR */}
              <div
                style={{
                  width: "186.995px",
                  height: "0.813px",
                  background: "#484848",
                  marginBottom: "16px",
                }}
              />

              {/* Name */}
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "26.017px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {visibleReviews[1].name}
              </p>

              {/* Occupation */}
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "13.008px",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {visibleReviews[1].occupation}
              </p>
            </div>
          </div>

          {/* Right Review Card (Behind) */}
          <div
            className='absolute hidden md:flex items-stretch'
            style={{
              width: "726.836px",
              height: "243.906px",
              borderRadius: "6.098px",
              background: "#FFF",
              boxShadow: "0 12.195px 36.586px 0 rgba(46, 33, 61, 0.08)",
              overflow: "hidden",
              right: "calc(50% - 550px)",
              zIndex: 1,
            }}
          >
            {/* Stacked Images */}
            <div
              className='relative'
              style={{
                width: "160px",
                height: "160px",
                flexShrink: 0,
                alignSelf: "center",
                marginLeft: "30px",
              }}
            >
              {/* Back layer */}
              <div
                className='absolute'
                style={{
                  width: "160px",
                  height: "160px",
                  background: "#E8E8E8",
                  borderRadius: "4px",
                  top: "12px",
                  left: "12px",
                  zIndex: 1,
                }}
              />
              {/* Middle layer */}
              <div
                className='absolute'
                style={{
                  width: "160px",
                  height: "160px",
                  background: "#F0F0F0",
                  borderRadius: "4px",
                  top: "6px",
                  left: "6px",
                  zIndex: 2,
                }}
              />
              {/* Front layer (main image) */}
              <div
                className='relative overflow-hidden'
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "4px",
                  zIndex: 3,
                }}
              >
                <Image
                  src={visibleReviews[2].image}
                  alt={visibleReviews[2].name}
                  width={160}
                  height={160}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            {/* Content */}
            <div className='flex-1 flex flex-col justify-center' style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "56px", paddingBottom: "56px" }}>
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "13.008px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "12px",
                }}
              >
                "{visibleReviews[2].review}"
              </p>
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < visibleReviews[2].rating
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div
                style={{
                  width: "140px",
                  height: "0.813px",
                  background: "#484848",
                  marginBottom: "12px",
                }}
              />
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {visibleReviews[2].name}
              </p>
              <p
                style={{
                  color: "#484848",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {visibleReviews[2].occupation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.div 
          className='flex items-center justify-center gap-4 mt-12'
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
