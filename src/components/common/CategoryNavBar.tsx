"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useConfigStore } from "@/lib/store/configStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CountryNavBar } from "./CountryNavBar";
import { useClickOutside } from "@/hooks/useClickOutside";

export function CategoryNavBar() {
  const {
    categories,
    fetchCategories,
    isCategoriesLoading,
    countries,
    selectedCountry,
    setSelectedCountry,
    fetchCountries
  } = useConfigStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => {
    setIsOpen(false);
    setActiveCategory(null);
  });

  useEffect(() => {
    setMounted(true);
    fetchCategories();
    fetchCountries();
  }, [fetchCategories, fetchCountries]);

  // Set first category as active by default when opening
  useEffect(() => {
    if (isOpen && categories.length > 0 && !activeCategory) {
      setActiveCategory(String(categories[0].id));
    }
  }, [isOpen, categories, activeCategory]);

  if (!mounted) {
    return (
      <div className='w-full bg-[#EAF6FF] h-16'>
        <div className='max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16' />
      </div>
    );
  }

  const currentCategoryData = categories.find(c => String(c.id) === activeCategory);

  return (
    <div className='w-full bg-[#EAF6FF] sticky top-0 z-30'>
      <div className='max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16'>
        <div className='flex items-center justify-between h-16 relative'>

          {/* Left: All Categories Trigger */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 py-2 text-gray-800 hover:text-[#0092FF] transition-colors"
            >
              <div className="w-5 h-5 relative">
                <Image src="/categories.png" alt="Categories" fill className="object-contain" />
              </div>
              <span className="text-[14px] font-bold">All Categories</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex overflow-hidden z-[100] min-h-[400px]"
                >
                  {/* Category List (Left Sidebar) */}
                  <div className="w-[300px] bg-gray-50/50 border-r border-gray-100 py-4 overflow-y-auto">
                    {isCategoriesLoading ? (
                      <div className="px-4 space-y-4">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-xl" />)}
                      </div>
                    ) : (
                      categories.map((cat) => (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCategory(String(cat.id))}
                          className={cn(
                            "w-full flex items-center justify-between px-6 py-3.5 text-left transition-all",
                            activeCategory === String(cat.id)
                              ? "bg-white text-[#0092FF] font-bold shadow-sm"
                              : "text-gray-600 hover:bg-gray-100/50 font-medium"
                          )}
                        >
                          <span className="text-sm">{cat.name}</span>
                          <ArrowRight className={cn("w-3.5 h-3.5 transition-opacity", activeCategory === String(cat.id) ? "opacity-100" : "opacity-0")} />
                        </button>
                      ))
                    )}
                  </div>

                  {/* Subcategories (Right Content) */}
                  <div className="flex-1 p-8 bg-white overflow-y-auto">
                    {currentCategoryData ? (
                      <div>
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-xl font-bold text-gray-900">{currentCategoryData.name}</h3>
                          <Link
                            href={`/category/${currentCategoryData.id}`}
                            className="text-sm font-bold text-[#0092FF] hover:underline"
                            onClick={() => setIsOpen(false)}
                          >
                            View All Products
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {currentCategoryData.subCategories && currentCategoryData.subCategories.length > 0 ? (
                            currentCategoryData.subCategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/category/${currentCategoryData.id}?sub=${sub.id}`}
                                className="group flex flex-col gap-1.5"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="text-[15px] font-bold text-gray-800 group-hover:text-[#0092FF] transition-colors">
                                  {sub.name}
                                </span>
                                <span className="text-[12px] text-gray-400 font-medium">Explore latest items</span>
                              </Link>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">No subcategories available</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-300">
                        Select a category to view details
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Country Navigation */}
          <CountryNavBar
            countries={countries}
            activeCountryId={String(selectedCountry?.id || "")}
            onSelect={(id) => {
              const c = countries.find(country => String(country.id) === String(id));
              if (c) setSelectedCountry(c);
            }}
          />

        </div>
      </div>
    </div>
  );
}
