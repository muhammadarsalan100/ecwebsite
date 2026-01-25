"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Category {
  id: string;
  name: string;
  hasDropdown?: boolean;
}

const categories: Category[] = [
  { id: "groceries", name: "Groceries", hasDropdown: true },
  { id: "premium-fruits", name: "Premium Fruits", hasDropdown: true },
  { id: "home-kitchen", name: "Home & Kitchen", hasDropdown: true },
  { id: "fashion", name: "Fashion", hasDropdown: true },
  { id: "electronics", name: "Electronics", hasDropdown: true },
  { id: "beauty", name: "Beauty", hasDropdown: true },
  { id: "home-improvement", name: "Home Improvement", hasDropdown: true },
  { id: "sports-toys", name: "Sports, Toys & Luggage", hasDropdown: false },
];

export function CategoryNavBar() {
  const [activeCategory, setActiveCategory] = useState("groceries");

  return (
    <div className='w-full bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='overflow-x-auto scrollbar-hide py-3 md:py-4'>
          <div className='flex items-center gap-3 w-max px-4 sm:px-6 lg:px-8'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200
                  ${activeCategory === category.id
                    ? "bg-[#0092FF] text-white"
                    : "bg-[#F3F9FF] text-gray-600 hover:bg-[#E6F4FF]"
                  }
                `}
              >
                <span>{category.name}</span>
                {category.hasDropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${activeCategory === category.id
                      ? "text-white rotate-180"
                      : "text-gray-400"
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
