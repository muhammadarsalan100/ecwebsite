"use client";

import { Country } from "@/types/wallet";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CountryNavBarProps {
  countries: Country[];
  activeCountryId: number | string;
  onSelect: (id: number | string) => void;
}

export function CountryNavBar({ countries, activeCountryId, onSelect }: CountryNavBarProps) {
  return (
    <div className='flex items-center gap-3 sm:gap-4'>
      <span className="text-[11px] sm:text-[13px] font-bold text-gray-800 whitespace-nowrap uppercase tracking-wider opacity-60">Shopping Places</span>
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide p-2 flex-1">
        {countries.map((country) => {
          const isActive = String(activeCountryId) === String(country.id);
          return (
            <button
              key={country.id}
              onClick={() => onSelect(country.id)}
              className="flex items-center gap-2 group transition-all duration-300"
            >
              <div className={cn(
                "relative w-7 h-7 rounded-full shrink-0 transition-all duration-300",
                isActive ? "ring-2 ring-[#0092FF] ring-offset-2 bg-white" : "ring-0 group-hover:ring-1 group-hover:ring-gray-300"
              )}>
                <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-100/50">
                  {country.flagUrl ? (
                    <Image
                      src={country.flagUrl}
                      alt={country.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-500">
                        {country.shortCode || country.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <span className={cn(
                "text-[13px] whitespace-nowrap transition-colors",
                isActive ? "font-bold text-gray-900" : "font-medium text-gray-600 group-hover:text-gray-900"
              )}>
                {country.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
