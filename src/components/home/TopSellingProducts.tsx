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
import { authService } from "@/services/authService";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/common/ProductCard";

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
        const response = await authService.getTopVendors();
        const vendors: any[] = response?.data?.items || [];

        // Flatten all topProducts from every vendor into one list
        const mappedProducts = vendors.flatMap((vendor: any) =>
          (vendor.topProducts || []).map((product: any) => ({
            id: product.listingId || product.itemId || product.id,
            listingId: product.listingId,
            itemId: product.itemId,
            name: product.itemName || product.name || "Product",
            image: product.image || product.icon || product.logo || "/p-1.jpg",
            price: product.currentPrice || product.price || 0,
            originalPrice: product.originalPrice,
            isPromotionApplied: product.isPromotionApplied,
            currencyCode: product.currencyCode || "AED",
            reviews: product.unitsSold || 0,
            rating: product.rating || 5, // Top vendors usually have high ratings
            stockMessage: product.stockMessage
          }))
        );

        if (mappedProducts.length > 0) {
          setProducts(mappedProducts);
        } else if (initialProducts.length > 0) {
          setProducts(initialProducts);
        }
      } catch (error) {
        console.error("Failed to fetch top vendors:", error);
        if (initialProducts.length > 0) setProducts(initialProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopSold();
  }, [isAuthLoading, isAuthenticated]);

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
            <CarouselContent className='-ml-4 items-stretch'>
              {products.map((product, index) => (
                <CarouselItem
                  key={product.id}
                  className='pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4'
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section >
  );
}
