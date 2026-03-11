"use client";

import { Country } from "@/types/wallet";
import Image from "next/image";

interface CountryNavBarProps {
  countries: Country[];
  activeCountryId: number | string;
  onSelect: (id: number | string) => void;
}

export function CountryNavBar({ countries, activeCountryId, onSelect }: CountryNavBarProps) {
  return (
    <div className='w-full'>
      {/* Country Navigation Bar */}
      <div className='bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='overflow-x-auto scrollbar-hide py-2 md:py-3'>
            <div className='flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 md:justify-center md:w-max md:mx-auto'>
              {countries.map((country) => {
                const isActive = String(activeCountryId) === String(country.id);
                return (
                  <button
                    key={country.id}
                    onClick={() => onSelect(country.id)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200
                      ${isActive
                        ? "bg-[#0092FF] text-white shadow-sm shadow-blue-500/20"
                        : "bg-[#F3F9FF] text-gray-600 hover:bg-[#E6F4FF]"
                      }
                    `}
                  >
                    <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={country.flagUrl}
                        alt={country.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span>{country.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
