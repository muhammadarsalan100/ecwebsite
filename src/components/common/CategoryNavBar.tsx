"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useConfigStore } from "@/lib/store/configStore";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";

export function CategoryNavBar() {
  const { categories, fetchCategories, isCategoriesLoading, activeCategoryId, setActiveCategoryId } = useConfigStore();
  const { isLoading: isAuthLoading } = useAuth();
  const params = useParams();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync active category with URL
  useEffect(() => {
    if (params.id) {
      setActiveCategoryId(String(params.id));
    }
  }, [params.id, setActiveCategoryId]);

  useEffect(() => {
    if (!isAuthLoading) {
      fetchCategories();
    }
  }, [fetchCategories, isAuthLoading]);

  // Auto-select the first category if none is selected and no URL param
  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId && !params.id) {
      setActiveCategoryId(String(categories[0].id));
    }
  }, [categories, activeCategoryId, params.id, setActiveCategoryId]);

  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
  };

  const currentHoveredCategory = categories.find(c => String(c.id) === hoveredCategory);

  return (
    <div className='w-full bg-white border-b border-gray-100 sticky top-0 z-40' onMouseLeave={handleMouseLeave}>
      <div className='max-w-7xl mx-auto'>
        <div className='relative flex items-center h-14 px-4 sm:px-6 lg:px-8'>
          {/* Main Categories Scroll */}
          <div className='flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1'>
            {isCategoriesLoading ? (
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-8 w-24 animate-pulse bg-gray-50 rounded-full" />
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(String(category.id))}
                >
                  <Link
                    href={`/category/${category.id}`}
                    onClick={() => setActiveCategoryId(String(category.id))}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-300",
                      activeCategoryId === String(category.id) || hoveredCategory === String(category.id)
                        ? "bg-[#0092FF] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <span>{category.name}</span>
                    {category.subCategories && category.subCategories.length > 0 && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300",
                          hoveredCategory === String(category.id) ? "rotate-180" : "opacity-40"
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {hoveredCategory && currentHoveredCategory && currentHoveredCategory.subCategories?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50 overflow-hidden"
              onMouseEnter={() => handleMouseEnter(hoveredCategory)}
            >
              <div className="max-w-7xl mx-auto p-10 flex gap-12">
                {/* Left: Subcategories Grid */}
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-h-[60vh] lg:max-h-none overflow-y-auto lg:overflow-visible pr-1">
                    {currentHoveredCategory.subCategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${currentHoveredCategory.id}?sub=${sub.id}`}
                        className="group flex flex-col gap-1"
                      >
                        <span className="text-[14px] font-bold text-gray-800 group-hover:text-[#0092FF] transition-colors flex items-center gap-2">
                          {sub.name}
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </span>
                        <span className="text-[12px] text-gray-400 font-medium">Explore latest items</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right: Featured Collections (Banners) - Desktop only */}
                <div className="hidden lg:flex w-[450px] gap-4 shrink-0">
                  {/* Main Banner */}
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#D1E9F5] group/banner">
                    <div className="absolute inset-0 p-6 flex flex-col justify-start z-10">
                      <h4 className="text-2xl font-bold text-gray-900 leading-tight mb-2">The NEW<br />Standard</h4>
                      <p className="text-sm text-gray-600 mb-6 font-medium">Best {currentHoveredCategory.name} products starts from</p>
                      <div className="mt-auto">
                        <p className="text-lg font-bold text-gray-900 mb-4">FROM AED 200</p>
                        <button className="bg-[#FFCC00] text-gray-900 px-6 py-2 rounded-full text-xs font-bold hover:bg-black hover:text-white transition-all">
                          Buy Now
                        </button>
                      </div>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-40 group-hover/banner:scale-110 transition-transform duration-700">
                      <Image
                        src="/p-1.jpg"
                        alt="featured"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Side Banners Stack */}
                  <div className="w-[180px] flex flex-col gap-4">
                    <div className="h-1/2 bg-[#A855F7] rounded-2xl p-4 relative overflow-hidden group/s">
                      <h5 className="text-white text-xs font-bold mb-1">New Arrivals</h5>
                      <p className="text-white/80 text-[10px]">Start from AED 50</p>
                      <div className="absolute right-2 bottom-2 w-12 h-12">
                        <Image src="/p-3.jpg" alt="s" fill className="object-contain group-hover/s:scale-110 transition-all" />
                      </div>
                    </div>
                    <div className="h-1/2 bg-[#FF9900] rounded-2xl p-4 relative overflow-hidden group/s">
                      <h5 className="text-white text-xs font-bold mb-1">Limited Offer</h5>
                      <p className="text-white/80 text-[10px]">SAVE UP TO 40%</p>
                      <div className="absolute right-2 bottom-2 w-12 h-12">
                        <Image src="/p-4.jpg" alt="s" fill className="object-contain group-hover/s:scale-110 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
