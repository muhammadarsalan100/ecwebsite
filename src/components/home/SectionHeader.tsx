"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  titleBold: string;
  titleLight: string;
  subtitle?: string;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function SectionHeader({
  titleBold,
  titleLight,
  subtitle,
  showNavigation = false,
  onPrevious,
  onNext,
}: SectionHeaderProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='text-3xl md:text-4xl mb-1'>
            <span className='font-serif italic'>{titleBold}</span>{" "}
            <span className='font-sans font-light'>{titleLight}</span>
          </h2>

          <div className='w-65 h-px bg-gray-300 mt-4 mb-3' />

          {subtitle && (
            <p className='text-muted-foreground text-sm'>{subtitle}</p>
          )}
        </div>

        {showNavigation && (
          <div className='flex gap-2'>
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
              aria-label='Previous'
            >
              <ChevronLeft className='w-5 h-5 text-gray-600' />
            </button>

            <button
              onClick={onNext}
              disabled={!onNext}
              className='w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
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
