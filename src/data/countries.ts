
import { Product } from "@/types";

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  products: Product[];
}

export const countriesData: Country[] = [
  {
    id: "uae",
    name: "UAE",
    code: "AE",
    flag: "https://flagcdn.com/w80/ae.png",
    products: [
      { id: "101", listingId: "101", itemId: "101", name: "Luxury Oud Perfume", price: 450, image: "/p-1.jpg", rating: 5, reviews: "1.2k", brand: "Arabian Oud" },
      { id: "102", listingId: "102", itemId: "102", name: "Desert Safari Gear", price: 250, image: "/p-2.jpg", rating: 4, reviews: "850", brand: "Desert Fox", soldOut: true },
      { id: "103", listingId: "103", itemId: "103", name: "Premium Silk Kaftan", price: 890, image: "/p-3.jpg", rating: 5, reviews: "2.1k", brand: "Al-Karam" },
      { id: "104", listingId: "104", itemId: "104", name: "Smart Home Hub", price: 599, image: "/p-4.jpg", rating: 4, reviews: "500", brand: "SmartLife" }
    ]
  },
  {
    id: "china",
    name: "China",
    code: "CN",
    flag: "https://flagcdn.com/w80/cn.png",
    products: [
      { id: "201", listingId: "201", itemId: "201", name: "Ceramic Tea Set", price: 85, image: "/p-5.jpg", rating: 5, reviews: "3.5k", brand: "Jingdezhen" },
      { id: "202", listingId: "202", itemId: "202", name: "Silk Robe", price: 120, image: "/p-6.jpg", rating: 5, reviews: "1.8k", brand: "SilkRoad", soldOut: true },
      { id: "203", listingId: "203", itemId: "203", name: "Mechanical Gaming Keyboard", price: 150, image: "/p-7.jpg", rating: 4, reviews: "5.2k", brand: "RedDragon" },
      { id: "204", listingId: "204", itemId: "204", name: "Bamboo Zen Garden", price: 45, image: "/p-8.jpg", rating: 4, reviews: "900", brand: "ZenLife" }
    ]
  },
  {
    id: "pakistan",
    name: "Pakistan",
    code: "PK",
    flag: "https://flagcdn.com/w80/pk.png",
    products: [
      { id: "301", listingId: "301", itemId: "301", name: "Pashmina Shawl", price: 150, image: "/p-9.jpg", rating: 5, reviews: "2.4k", brand: "Kashmir Looms" },
      { id: "302", listingId: "302", itemId: "302", name: "Leather Peshawari Chappal", price: 45, image: "/p-10.jpg", rating: 4, reviews: "1.5k", brand: "Peshawar Leather", soldOut: true },
      { id: "303", listingId: "303", itemId: "303", name: "Himalayan Salt Lamp", price: 35, image: "/p-11.jpg", rating: 5, reviews: "3.1k", brand: "Himalayan Glow" },
      { id: "304", listingId: "304", itemId: "304", name: "Cotton Kurta Set", price: 60, image: "/p-12.jpg", rating: 4, reviews: "1.2k", brand: "Gul Ahmed" }
    ]
  },
  {
    id: "india",
    name: "India",
    code: "IN",
    flag: "https://flagcdn.com/w80/in.png",
    products: [
      { id: "401", listingId: "401", itemId: "401", name: "Copper Water Bottle", price: 25, image: "/p-13.jpg", rating: 4, reviews: "1.9k", brand: "Ayurveda Pure" },
      { id: "402", listingId: "402", itemId: "402", name: "Assam Black Tea", price: 30, image: "/p-14.jpg", rating: 5, reviews: "2.8k", brand: "Assam Tea Co", soldOut: true },
      { id: "403", listingId: "403", itemId: "403", name: "Handcrafted Spice Box", price: 55, image: "/p-1.jpg", rating: 5, reviews: "950", brand: "Masala Magic" },
      { id: "404", listingId: "404", itemId: "404", name: "Organic Yoga Mat", price: 75, image: "/p-2.jpg", rating: 4, reviews: "1.6k", brand: "Yogi Life" }
    ]
  },
  {
    id: "southafrica",
    name: "South Africa",
    code: "ZA",
    flag: "https://flagcdn.com/w80/za.png",
    products: [
      { id: "501", listingId: "501", itemId: "501", name: "Zulu Beaded Necklace", price: 55, image: "/p-3.jpg", rating: 5, reviews: "800", brand: "Zulu Beads" },
      { id: "502", listingId: "502", itemId: "502", name: "Rooibos Tea Selection", price: 20, image: "/p-4.jpg", rating: 5, reviews: "1.5k", brand: "Cederberg Tea", soldOut: true },
      { id: "503", listingId: "503", itemId: "503", name: "Leather Safari Hat", price: 85, image: "/p-5.jpg", rating: 4, reviews: "2.1k", brand: "Safari Gear" },
      { id: "504", listingId: "504", itemId: "504", name: "African Print Tote", price: 40, image: "/p-6.jpg", rating: 4, reviews: "1.1k", brand: "Shweshwe Designs" }
    ]
  },
  {
    id: "usa",
    name: "USA",
    code: "US",
    flag: "https://flagcdn.com/w80/us.png",
    products: [
      { id: "601", listingId: "601", itemId: "601", name: "Vintage Denim Jacket", price: 95, image: "/p-7.jpg", rating: 5, reviews: "4.5k", brand: "Levis" },
      { id: "602", listingId: "602", itemId: "602", name: "Smart Noise-Cancelling Headphones", price: 349, image: "/p-8.jpg", rating: 5, reviews: "8.2k", brand: "Bose", soldOut: true },
      { id: "603", listingId: "603", itemId: "603", name: "Artisan Coffee Roaster", price: 1200, image: "/p-9.jpg", rating: 5, reviews: "300", brand: "Coffee Tech" },
      { id: "604", listingId: "604", itemId: "604", name: "National Park Poster Set", price: 65, image: "/p-10.jpg", rating: 4, reviews: "2.5k", brand: "National Parks" }
    ]
  }
];
