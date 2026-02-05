"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import type { StaticImageData } from "next/image";

import { Category } from "@/types";

interface CategoriesViewProps {
  titleBold: string;
  titleLight: string;
  subtitle?: string;
  categories: Category[];
  itemsPerView?: number;
  showNavigation?: boolean;
}

export function CategoriesView({
  titleBold,
  titleLight,
  subtitle,
  categories,
  itemsPerView = 4,
  showNavigation = true,
}: CategoriesViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(categories.length - itemsPerView, prev + 1),
    );
  };

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsPerView,
  );

  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-16 bg-background'>
      <div className='max-w-6xl mx-auto'>
        <SectionHeader
          titleBold={titleBold}
          titleLight={titleLight}
          subtitle={subtitle}
          showNavigation={showNavigation}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Categories Grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {visibleCategories.map((category, index) => (
            <div key={index} className='group cursor-pointer'>
              <div className='aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4'>
                <div className='relative w-full h-full'>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className='object-contain group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
              </div>
              <h3 className='text-sm font-medium text-center text-foreground'>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
