"use client";

import { useState, useMemo } from "react";
import { countriesData } from "@/data/countries";
import { CountryNavBar } from "@/components/common/CountryNavBar";
import { AllProducts } from "@/components/home/AllProducts";

export function CountryFilteredProducts() {
  const [activeCountryId, setActiveCountryId] = useState<string | number>(countriesData[0]?.id || "");

  // Get the filtered products based on the active country
  const { products, title } = useMemo(() => {
    // Find the specific country
    const activeCountry = countriesData.find((c) => c.id === activeCountryId) || countriesData[0];

    return {
      products: activeCountry.products,
      title: activeCountry.name
    };
  }, [activeCountryId]);

  // Map static countries to match the dynamic Country interface expected by CountryNavBar
  const mappedCountries = useMemo(() => {
    return countriesData.map(c => ({
      id: c.id,
      name: c.name,
      shortCode: c.code,
      language: 'en',
      flagUrl: c.flag,
      currency: { name: 'USD', shortCode: 'USD', symbolUrl: '$' },
      code: c.code
    }));
  }, []);

  return (
    <section className="flex flex-col">
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
        <h2 className="mb-6 text-[32px] font-semibold text-black font-poppins text-center">
          {title} Products
        </h2>
      </div>

      <CountryNavBar
        countries={mappedCountries as any}
        activeCountryId={activeCountryId}
        onSelect={setActiveCountryId}
      />

      {/* 
         We pass the filtered list of products to the AllProducts component.
         AllProducts is designed to take a 'products' prop.
      */}
      <AllProducts products={products} />
    </section>
  );
}
