"use client";

import { useEffect } from "react";
import { CountryNavBar } from "@/components/common/CountryNavBar";
import { useConfigStore } from "@/lib/store/configStore";
import { AllProducts } from "@/components/home/AllProducts";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SummerHero } from "@/components/home/SummerHero";
import { TopSellingProducts } from "@/components/home/TopSellingProducts";
import { TopCategories } from "@/components/home/TopCategories";
import { LeatherBagBanner } from "@/components/home/LeatherBagBanner";
import { SmartWearableBanner } from "@/components/home/SmartWearableBanner";
import { CustomerReview } from "@/components/home/CustomerReview";
import { Newsletter } from "@/components/sharedcomponent/Newsletter";
import { Loader } from "@/components/ui/loader";


const featuredProducts = [
  {
    id: "1",
    image: "/feat-1.jpg",
    title: "Get up to 5% off",
    subtitle: "discounts",
  },
  {
    id: "2",
    image: "/feat-2.jpg",
    title: "Soothing Cap",
    subtitle: "connected comfort",
  },
  {
    id: "3",
    image: "/feat-3.jpg",
    title: "Get up to 5% off",
    subtitle: "discounts",
  },
];

/*
const topCategoriesData = [
  {
    id: "1",
    name: "Mobile Phone",
    image: "/p-1.jpg",
  },
  {
    id: "2",
    name: "Electronics",
    image: "/p-2.jpg",
  },
  {
    id: "3",
    name: "Watches",
    image: "/p-3.jpg",
  },
  {
    id: "4",
    name: "Furnitures",
    image: "/p-4.jpg",
  },
  {
    id: "5",
    name: "Cosmetic",
    image: "/p-5.jpg",
  },
];
*/

const allProductsData = [
  {
    id: "1",
    name: "Shiny Dress",
    brand: "Al Karam",
    image: "/p-1.jpg",
    price: 95.5,
    reviews: "4.1k",
    rating: 5,
    almostSoldOut: true,
  },
  {
    id: "2",
    name: "Long Dress",
    brand: "Al Karam",
    image: "/p-2.jpg",
    price: 85.0,
    reviews: "3.8k",
    rating: 5,
    almostSoldOut: true,
  },
  {
    id: "3",
    name: "Full Sweater",
    brand: "Al Karam",
    image: "/p-3.jpg",
    price: 120.0,
    reviews: "4.5k",
    rating: 5,
    almostSoldOut: false,
  },
  {
    id: "4",
    name: "White Dress",
    brand: "Al Karam",
    image: "/p-4.jpg",
    price: 75.5,
    reviews: "3.2k",
    rating: 4,
    almostSoldOut: true,
  },
  {
    id: "5",
    name: "Colorful Dress",
    brand: "Al Karam",
    image: "/p-5.jpg",
    price: 110.0,
    reviews: "4.0k",
    rating: 5,
    almostSoldOut: false,
  },
  {
    id: "6",
    name: "White Shirt",
    brand: "Al Karam",
    image: "/p-6.jpg",
    price: 65.0,
    reviews: "2.9k",
    rating: 4,
    almostSoldOut: true,
  },
  {
    id: "7",
    name: "Summer Top",
    brand: "Al Karam",
    image: "/p-7.jpg",
    price: 55.5,
    reviews: "3.5k",
    rating: 5,
    almostSoldOut: false,
  },
  {
    id: "8",
    name: "Casual Wear",
    brand: "Al Karam",
    image: "/p-8.jpg",
    price: 89.0,
    reviews: "4.2k",
    rating: 5,
    almostSoldOut: true,
  },
  {
    id: "9",
    name: "Party Dress",
    brand: "Al Karam",
    image: "/p-9.jpg",
    price: 145.0,
    reviews: "5.1k",
    rating: 5,
    almostSoldOut: false,
  },
  {
    id: "10",
    name: "Elegant Gown",
    brand: "Al Karam",
    image: "/p-10.jpg",
    price: 195.5,
    reviews: "4.8k",
    rating: 5,
    almostSoldOut: true,
  },
  {
    id: "11",
    name: "Floral Dress",
    brand: "Al Karam",
    image: "/p-11.jpg",
    price: 78.0,
    reviews: "3.6k",
    rating: 4,
    almostSoldOut: false,
  },
  {
    id: "12",
    name: "Maxi Dress",
    brand: "Al Karam",
    image: "/p-12.jpg",
    price: 125.0,
    reviews: "4.3k",
    rating: 5,
    almostSoldOut: true,
  },
  {
    id: "13",
    name: "Cocktail Dress",
    brand: "Al Karam",
    image: "/p-13.jpg",
    price: 165.0,
    reviews: "4.7k",
    rating: 5,
    almostSoldOut: false,
  },
  {
    id: "14",
    name: "Evening Wear",
    brand: "Al Karam",
    image: "/p-14.jpg",
    price: 185.5,
    reviews: "5.0k",
    rating: 5,
    almostSoldOut: true,
  },
];

const topSellingProducts = [
  {
    id: "1",
    name: "Summer Girl Shirts",
    image: "/p-1.jpg",
    price: 25.38,
    reviews: "4.1k",
    rating: 5,
  },
  {
    id: "2",
    name: "Summer Clothes",
    image: "/p-2.jpg",
    price: 35.5,
    reviews: "4.1k",
    rating: 5,
  },
  {
    id: "3",
    name: "Elegant Dress",
    image: "/p-3.jpg",
    price: 45.0,
    reviews: "3.8k",
    rating: 5,
  },
  {
    id: "4",
    name: "Formal Shirt",
    image: "/p-4.jpg",
    price: 55.38,
    reviews: "4.2k",
    rating: 5,
  },
  {
    id: "5",
    name: "Party Wear",
    image: "/p-5.jpg",
    price: 89.99,
    reviews: "3.2k",
    rating: 5,
  },
  {
    id: "6",
    name: "Casual Top",
    image: "/p-6.jpg",
    price: 29.0,
    reviews: "2.8k",
    rating: 4,
  },
  {
    id: "7",
    name: "Designer Dress",
    image: "/p-7.jpg",
    price: 149.5,
    reviews: "5.1k",
    rating: 5,
  },
  {
    id: "8",
    name: "Floral Collection",
    image: "/p-8.jpg",
    price: 65.0,
    reviews: "1.9k",
    rating: 4,
  },
];

import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { isLoading: isAuthLoading } = useAuth();
  const {
    countries,
    fetchCountries,
    categories,
    fetchCategories,
    isCategoriesLoading,
    selectedCountry,
    setSelectedCountry,
    activeCategoryId,
    fetchCatalogItems,
    isItemsLoading,
    items
  } = useConfigStore();

  // 1. Initial Data Load
  useEffect(() => {
    if (!isAuthLoading) {
      fetchCountries();
      fetchCategories();
    }
  }, [isAuthLoading, fetchCountries, fetchCategories]);

  // 2. Select Default Country (UAE or PK preference)
  useEffect(() => {
    if (countries.length > 0 && !selectedCountry) {
      const uae = countries.find(c =>
        c.shortCode?.toUpperCase() === 'UAE' ||
        c.shortCode?.toUpperCase() === 'AE'
      );
      const pk = countries.find(c =>
        c.shortCode?.toUpperCase() === 'PK'
      );
      setSelectedCountry(uae || pk || countries[0]);
    }
  }, [countries, selectedCountry, setSelectedCountry]);

  // 3. Fetch Items when Country or Category changes
  useEffect(() => {
    if (selectedCountry && activeCategoryId) {
      fetchCatalogItems(selectedCountry.shortCode, activeCategoryId);
    }
  }, [selectedCountry, activeCategoryId, fetchCatalogItems]);

  // 4. Transform Backend Items to Frontend Product list
  const displayedProducts = items.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    brand: item.vendor?.fullName || "Store",
    image: item.icon || (item.images?.length > 0 ? item.images[0].url : "/p-1.jpg"),
    price: item.price,
    rating: item.rating || 5,
    reviews: "120", // Static for now as not in search response
    almostSoldOut: item.manageStock && item.minimumStockThreshhold > 0,
  }));

  // 5. Transform Categories for TopCategories view
  const mappedTopCategories = categories.slice(0, 5).map(cat => ({
    ...cat,
    image: cat.icon || (cat.images?.length > 0 ? cat.images[0].url : "/p-2.jpg")
  }));

  return (
    <>
      <CountryNavBar
        countries={countries}
        activeCountryId={String(selectedCountry?.id || "")}
        onSelect={(id) => {
          const c = countries.find(country => String(country.id) === String(id));
          if (c) setSelectedCountry(c);
        }}
      />
      <CategoryNavBar />
      <SummerHero />
      <FeaturedProducts products={featuredProducts} />
      <TopSellingProducts />
      {isCategoriesLoading ? (
        <section className="w-full px-4 py-16 md:px-8 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-10 gap-x-4 md:gap-x-6 lg:gap-x-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-5">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full bg-gray-100 animate-pulse" />
                  <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <TopCategories categories={mappedTopCategories as any[]} />
      )}
      <LeatherBagBanner />

      {/* All Products Section */}
      <div className="min-h-[400px] relative">
        {isItemsLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : (
          <AllProducts
            key={`prod-${selectedCountry?.id}-${activeCategoryId}`}
            products={displayedProducts}
          />
        )}
      </div>

      <SmartWearableBanner />
      <CustomerReview />
      <Newsletter />
    </>
  );
}
