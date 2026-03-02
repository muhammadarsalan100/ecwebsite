"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import { useConfigStore } from "@/lib/store/configStore";
import { useAuth } from "@/lib/auth-context";

export function CategoryNavBar() {
  const { categories, fetchCategories, isCategoriesLoading, activeCategoryId, setActiveCategoryId } = useConfigStore();
  const { isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories, isAuthLoading]);

  // When categories load, select the first one if nothing is selected
  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(String(categories[0].id));
    }
  }, [categories, activeCategoryId, setActiveCategoryId]);

  return (
    <div className='w-full bg-background border-b border-border'>
      <div className='max-w-7xl mx-auto'>
        <div className='overflow-x-auto scrollbar-hide py-3 md:py-4'>
          <div className='flex items-center gap-3 w-max px-4 sm:px-6 lg:px-8'>
            {isCategoriesLoading && (
              <div className="flex gap-3 px-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-9 w-24 animate-pulse bg-gray-100 rounded-full" />
                ))}
              </div>
            )}
            {!isCategoriesLoading && categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(String(category.id))}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${activeCategoryId === String(category.id)
                    ? "bg-[#0092FF] text-white shadow-sm shadow-blue-500/20"
                    : "bg-[#F3F9FF] text-gray-600 hover:bg-[#E6F4FF]"
                  }
                `}
              >
                <span>{category.name}</span>
                {category.subCategories && category.subCategories.length > 0 && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${activeCategoryId === String(category.id)
                      ? "text-white rotate-180"
                      : "text-muted-foreground/60"
                      }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
