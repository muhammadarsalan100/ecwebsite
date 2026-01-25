import { CategoryNavBar } from "@/components/home/CategoryNavBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SummerHero } from "@/components/home/SummerHero";
import { TopSellingProducts } from "@/components/home/TopSellingProducts";
import { TopCategories } from "@/components/home/TopCategories";
import { LeatherBagBanner } from "@/components/home/LeatherBagBanner";
import { AllProducts } from "@/components/home/AllProducts";
import { SmartWearableBanner } from "@/components/home/SmartWearableBanner";
import { CustomerReview } from "@/components/home/CustomerReview";
import { Newsletter } from "@/components/home/Newsletter";

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

export default function Home() {
  return (
    <>
      <CategoryNavBar />
      <SummerHero />
      <FeaturedProducts products={featuredProducts} />
      <TopSellingProducts products={topSellingProducts} />
      <TopCategories categories={topCategoriesData} />
      <LeatherBagBanner />
      <AllProducts products={allProductsData} />
      <SmartWearableBanner />
      <CustomerReview />
      <Newsletter />
    </>
  );
}
