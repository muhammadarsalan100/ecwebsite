"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

import { useCarousel } from "@/hooks/useCarousel";
import { productService } from "@/services/productService";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { SectionHeader } from "@/components/common/SectionHeader";

// Card heights sequence based on Figma
const cardHeights = [251, 370, 293, 251];

interface TopSellingProductsProps {
  initialProducts?: any[];
}

export function TopSellingProducts({ initialProducts = [] }: TopSellingProductsProps) {
  const { setApi, scrollPrev, scrollNext } = useCarousel();
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopSold = async () => {
      if (isAuthLoading) return;

      try {
        const response = await productService.getTopSoldProducts();
        console.log("[DEBUG] TopSold Response:", response);
        if (response && response.data && response.data.length > 0) {
          // Map API response to UI expected format
          const mappedProducts = response.data.map((item: any) => ({
            id: item.itemId,
            name: item?.item?.itemName || "Product",
            image: item?.item?.icon || "/p-1.jpg",
            price: item.totalSale ? (item.totalSale / 10) : 0,
            reviews: item.totalSale || "0",
            rating: 5,
          }));
          console.log("[DEBUG] Mapped Products:", mappedProducts);
          setProducts(mappedProducts);
        } else {
          console.log("[DEBUG] No top sold products found in response");
          if (initialProducts.length > 0) setProducts(initialProducts);
        }
      } catch (error) {
        console.error("Failed to fetch top sold products:", error);
        if (initialProducts.length > 0) setProducts(initialProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopSold();
  }, [isAuthLoading, isAuthenticated]); // Removed initialProducts from dependencies to prevent infinite loop

  if (isLoading) {
    return (
      <section className='w-full px-4 py-12 md:px-8 lg:px-12 border-t border-gray-200'>
        <div className='mx-auto max-w-7xl'>
          <div className="h-8 w-64 bg-gray-100 animate-pulse rounded-lg mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-gray-100 animate-pulse rounded-3xl" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  console.log("[DEBUG] Render State:", { productsCount: products.length, isLoading });
  if (products.length === 0 && !isLoading) return null;

  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-12 border-t border-gray-200'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <SectionHeader
          titleFull="Top-Selling Products of the year Collection"
          variant="poppins"
          showNavigation={true}
          onPrevious={scrollPrev}
          onNext={scrollNext}
          className="mb-10"
        />

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
                      <Link href={`/product/${product.id}`} className="block h-full">
                        {/* Product Image */}
                        <div
                          className='relative w-full mb-4 overflow-hidden bg-gray-100 rounded-[20px] flex items-center justify-center'
                          style={{
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
                                  className={`w-4 h-4 ${i < product.rating
                                    ? "fill-[#F59E0B] text-[#F59E0B]"
                                    : "fill-gray-200 text-gray-200"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section >
  );
}
