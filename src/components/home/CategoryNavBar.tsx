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
    <div className='w-full bg-white'>
      {/* Categories Container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide' style={{ marginTop: '16px', marginBottom: '16px' }}>
        <div className='flex items-center gap-3 w-max'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                ${
                  activeCategory === category.id
                    ? "bg-[#0090FF] text-white"
                    : "bg-[#EFF8FF] text-gray-700 hover:bg-[#d9efff]"
                }
              `}
            >
              <span>{category.name}</span>
              {category.hasDropdown && (
                <ChevronDown
                  className={`w-4 h-4 ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom HR */}
      <div className='w-full h-px' style={{ background: '#EDEDED' }} />
    </div>
  );
}
