"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeaderProps } from "@/types";

export function SectionHeader({
  titleBold,
  titleLight,
  titleFull,
  subtitle,
  showNavigation = false,
  onPrevious,
  onNext,
  variant = "serif",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className='flex items-start justify-between'>
        <div>
          {variant === "serif" ? (
            <h2 className='text-3xl md:text-4xl mb-1'>
              <span className='font-serif italic'>{titleBold}</span>{" "}
              <span className='font-sans font-light'>{titleLight}</span>
            </h2>
          ) : (
            <h2 className='text-3xl md:text-4xl font-bold font-poppins text-foreground leading-tight'>
              {titleFull || <>{titleBold} {titleLight}</>}
            </h2>
          )}

          {variant === "serif" && <div className='w-65 h-px bg-gray-300 mt-4 mb-3' />}

          {subtitle && (
            <p className='text-muted-foreground text-sm mt-2'>{subtitle}</p>
          )}
        </div>

        {showNavigation && (
          <div className='flex gap-2'>
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              aria-label='Previous'
            >
              <ChevronLeft className='w-5 h-5 text-gray-600' />
            </button>

            <button
              onClick={onNext}
              disabled={!onNext}
              className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              aria-label='Next'
            >
              <ChevronRight className='w-5 h-5 text-gray-600' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
