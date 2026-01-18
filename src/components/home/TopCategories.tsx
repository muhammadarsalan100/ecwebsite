"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  image: string | StaticImageData;
}

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
      ease: "easeOut" as const,
    },
  },
};

export function TopCategories({ categories }: TopCategoriesProps) {
  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        {/* Title */}
        <motion.h2 
          className='text-3xl md:text-4xl font-bold text-foreground mb-12'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Top Categories
        </motion.h2>

        {/* Categories Grid */}
        <motion.div 
          className='flex items-center justify-between gap-6 flex-wrap md:flex-nowrap'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className='flex flex-col items-center gap-4 cursor-pointer group'
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Circle Container */}
              <motion.div 
                className='w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#F0F0F0] flex items-center justify-center overflow-hidden group-hover:bg-[#e5e5e5] transition-colors'
                whileHover={{ scale: 1.05 }}
              >
                <div className='relative' style={{ width: '100px', height: '93px' }}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className='object-contain group-hover:scale-110 transition-transform duration-300'
                  />
                </div>
              </motion.div>

              {/* Category Name */}
              <p className='text-base md:text-lg font-medium text-foreground text-center'>
                {category.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
