"use client";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { CategoryNavBar } from "@/components/home/CategoryNavBar";

import { motion } from "framer-motion";



export default function ProductDetailPage() {
  const productImages = ["/p-1.jpg", "/p-2.jpg", "/p-3.jpg", "/p-4.jpg"];

  const productData = {
    title: "Raven Hoodie With Black colored Design",
    price: 63.0,
    rating: 3.5,
    reviewsCount: 120,
    description:
      "100% Bio-washed Cotton – makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Yellow", value: "#FCD34D" },
      { name: "Pink", value: "#EC4899" },
      { name: "Red", value: "#EF4444" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Women",
    subcategory: "Top",
  };

  const relatedProducts = [
    {
      id: "1",
      name: "Shiny Dress",
      brand: "Al Karam",
      image: "/p-1.jpg", // Using existing image paths
      price: 95.5,
      rating: 5,
      reviews: "4.1k",
      soldOut: true,
    },
    {
      id: "2",
      name: "Long Dress",
      brand: "Al Karam",
      image: "/p-5.jpg",
      price: 95.5,
      rating: 5,
      reviews: "4.1k",
      soldOut: true,
    },
    {
      id: "3",
      name: "Full Sweater",
      brand: "Al Karam",
      image: "/p-6.jpg",
      price: 95.5,
      rating: 5,
      reviews: "4.1k",
      soldOut: true,
    },
  ];

  return (
    <div className='bg-white dark:bg-black min-h-screen pb-20'>
      <CategoryNavBar />
      <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12'>
        {/* Main Product Section - Animated */}
        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ProductGallery images={productImages} />
          <ProductInfo {...productData} />
        </motion.div>

        {/* Categories / Tabs Section */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold mb-8 text-gray-900 dark:text-white'>Top Categories</h2>
          <ProductTabs description={productData.description} />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
