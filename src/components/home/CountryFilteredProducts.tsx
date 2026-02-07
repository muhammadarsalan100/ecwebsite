"use client";

import { useState } from "react";
import { countriesData } from "@/data/countries";
import { CountryNavBar } from "@/components/home/CountryNavBar";
import { AllProducts } from "@/components/home/AllProducts";

export function CountryFilteredProducts() {
  const [activeCountryId, setActiveCountryId] = useState(countriesData[0].id);

  // Find the active country; fallback to the first one if not found
  const activeCountry = countriesData.find((c) => c.id === activeCountryId) || countriesData[0];

  return (
    <section className="flex flex-col">
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
         <h2 className="mb-6 text-[32px] font-semibold text-black font-poppins text-center">
            {activeCountry.name} Products
         </h2>
      </div>

      <CountryNavBar 
        countries={countriesData} 
        activeCountryId={activeCountryId} 
        onSelect={setActiveCountryId} 
      />
      
      {/* 
         We pass the filtered list of products to the AllProducts component.
         AllProducts is designed to take a 'products' prop.
      */}
      <AllProducts products={activeCountry.products} />
    </section>
  );
}
