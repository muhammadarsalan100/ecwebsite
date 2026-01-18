"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  image: string | StaticImageData;
  price: number;
  reviews: string;
  rating: number;
}

interface TopSellingProductsProps {
  products: Product[];
}

// Card heights sequence based on Figma
const cardHeights = [251, 370, 293, 251];

export function TopSellingProducts({ products }: TopSellingProductsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-12 border-t border-gray-200'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <motion.div 
          className='flex items-start justify-between mb-10'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className='text-3xl md:text-4xl font-bold text-foreground leading-tight'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Top-Selling Product
            <br />
            of the year Collection
          </motion.h2>

          {/* Navigation Arrows */}
          <motion.div 
            className='flex items-center gap-2'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className='w-5 h-5 text-gray-600' />
            </motion.button>
            <motion.button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className='w-5 h-5 text-gray-600' />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-6 items-end'>
              {products.map((product, index) => {
                const height = cardHeights[index % cardHeights.length];

                return (
                  <CarouselItem
                    key={product.id}
                    className='pl-6 basis-1/2 md:basis-1/4'
                  >
                    <motion.div 
                      className='group cursor-pointer'
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Product Image */}
                      <div
                        className='relative w-full mb-4 overflow-hidden bg-gray-100'
                        style={{
                          borderRadius: "27px",
                          height: `${height}px`,
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-500'
                        />
                      </div>

                      {/* Product Info */}
                      <div className='space-y-2'>
                        <h3 className='text-lg font-semibold text-foreground'>
                          {product.name}
                        </h3>
                        <p className='text-sm text-gray-500'>
                          ({product.reviews}) Customer Reviews
                        </p>

                        {/* Price and Rating */}
                        <div className='flex items-center justify-between pt-2'>
                          <p className='text-base text-foreground'>
                            <span className='text-gray-500'>Price: </span>
                            <span className='font-semibold'>
                              ${product.price.toFixed(2)}
                            </span>
                          </p>

                          {/* Star Rating */}
                          <div className='flex items-center gap-0.5'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < product.rating
                                    ? "fill-[#F59E0B] text-[#F59E0B]"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
