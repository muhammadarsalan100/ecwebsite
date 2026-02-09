"use client";

import { useState, useMemo } from "react";
import { countriesData } from "@/data/countries";
import { CountryNavBar } from "@/components/home/CountryNavBar";
import { AllProducts } from "@/components/home/AllProducts";

export function CountryFilteredProducts() {
  const [activeCountryId, setActiveCountryId] = useState("all");

  // Get the filtered products based on the active country
  const { products, title } = useMemo(() => {
    if (activeCountryId === "all") {
      // Combine all products from all countries
      const allProducts = countriesData.flatMap((country) => country.products);
      return {
        products: allProducts,
        title: "All"
      };
    }

    // Find the specific country
    const activeCountry = countriesData.find((c) => c.id === activeCountryId);

    if (activeCountry) {
      return {
        products: activeCountry.products,
        title: activeCountry.name
      };
    }

    // Fallback to all products if country not found
    const allProducts = countriesData.flatMap((country) => country.products);
    return {
      products: allProducts,
      title: "All"
    };
  }, [activeCountryId]);

  return (
    <section className="flex flex-col">
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
        <h2 className="mb-6 text-[32px] font-semibold text-black font-poppins text-center">
          {title} Products
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
      <AllProducts products={products} />
    </section>
  );
}
