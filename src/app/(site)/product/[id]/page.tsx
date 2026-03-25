"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { Loader } from "@/components/ui/loader";

import { motion } from "framer-motion";
import { productService } from "@/services/productService";
import { useConfigStore } from "@/lib/store/configStore";
import { CatalogItemDetail } from "@/types/product";

// ─── Skeleton ───────────────────────────────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Gallery skeleton */}
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-4 w-24">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square w-full rounded-lg bg-gray-200" />
            ))}
          </div>
          <div className="flex-grow aspect-[3/4] md:h-[600px] rounded-2xl bg-gray-200" />
        </div>
        {/* Info skeleton */}
        <div className="flex flex-col gap-6 pt-4">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-4/6 bg-gray-200 rounded" />
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-6 rounded-full bg-gray-200" />
            ))}
          </div>
          <div className="flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-10 rounded-full bg-gray-200" />
            ))}
          </div>
          <div className="h-12 w-full rounded-lg bg-gray-200 mt-4" />
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract image URLs from a CatalogItem.
 * Falls back to icon, then a placeholder.
 */
function extractImages(item: CatalogItemDetail): string[] {
  // V2.0 images is a string[] of direct URLs
  if (item.images && item.images.length > 0) return item.images;
  if (item.logo) return [item.logo];
  return ["/p-1.jpg"];
}

/**
 * Map API CatalogItem to ProductInfo props.
 * Colors and sizes are not in the API response for the basic item endpoint,
 * so we default to empty arrays and let the UI gracefully handle it.
 */
function mapToProductInfoProps(item: CatalogItemDetail) {
  const images = extractImages(item);
  return {
    id: item.id,
    title: item.name,
    image: images[0] || "/p-1.jpg",
    price: item.price.price,
    originalPrice: item.price.mrp,
    currencyCode: item.price.currency,
    rating: item.rating?.rating ?? 0,
    reviewsCount: item.rating?.totalReviews ?? 0,
    description: item.shortDescription ?? "",
    colors: [],
    sizes: [],
    category: item.category?.name ?? "",
    subcategory: item.category?.subCategories?.[0]?.name ?? "",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [item, setItem] = useState<CatalogItemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCurrency } = useConfigStore();
  const currencyCode = selectedCurrency?.split(" - ")[0] || "USD";

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productService.getCatalogItemById(id, currencyCode);
        if (!cancelled && response?.data) {
          setItem(response.data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Failed to load product.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchItem();
    return () => { cancelled = true; };
  }, [id, currencyCode]);

  // ── Derived data ──────────────────────────────────────────────────────────
  const images = item ? extractImages(item) : [];
  const productInfoProps = item ? mapToProductInfoProps(item) : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white dark:bg-black min-h-screen pb-20">
      <CategoryNavBar />

      {isLoading ? (
        <ProductDetailSkeleton />
      ) : error ? (
        <div className="mx-auto max-w-7xl px-4 py-20 flex flex-col items-center gap-4">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-gray-500 underline hover:text-gray-900"
          >
            Try again
          </button>
        </div>
      ) : item && productInfoProps ? (
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12">
          {/* Main Product Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProductGallery images={images} />
            <ProductInfo {...productInfoProps} />
          </motion.div>

          {/* Tabs Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Product Details
            </h2>
            <ProductTabs 
              shortDescription={item.shortDescription}
              longDescription={item.longDescription}
              reviewsCount={item.rating?.totalReviews ?? 0}
              faqs={item.faqs}
              technicalAttributes={item.technicalAttributes}
              videos={item.videos}
              images={images}
            />
          </div>

          {/* Related Products — static for now, no related endpoint yet */}
          <RelatedProducts products={[]} />
        </div>
      ) : null}
    </div>
  );
}
