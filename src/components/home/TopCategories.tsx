"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Category } from "@/types";

interface TopCategoriesProps {
  categories: Category[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function TopCategories({ categories }: TopCategoriesProps) {
  return (
    <section className='w-full px-4 py-16 md:px-8 lg:px-12 bg-white'>
      <div className='mx-auto max-w-7xl'>
        {/* Title */}
        <motion.h2
          className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center md:text-left font-poppins'
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Top Categories
        </motion.h2>

        {/* Categories Flex Container */}
        <motion.div
          className='flex flex-wrap items-center justify-center md:justify-between gap-y-10 gap-x-4 md:gap-x-6 lg:gap-x-8'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className='flex flex-col items-center gap-5 cursor-pointer group shrink-0'
              variants={itemVariants}
            >
              {/* Circle Container */}
              <motion.div
                className='relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full bg-[#F8F8F8] border border-gray-100 flex items-center justify-center overflow-hidden group-hover:bg-[#f0f0f0] group-hover:border-primary/20 transition-all duration-300 shadow-sm group-hover:shadow-md'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className='relative w-[60%] h-[60%]'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className='object-contain group-hover:scale-110 transition-transform duration-500'
                  />
                </div>
              </motion.div>

              {/* Category Name */}
              <p className='text-sm sm:text-base md:text-lg font-bold text-gray-800 text-center group-hover:text-primary transition-colors font-poppins px-2'>
                {category.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
