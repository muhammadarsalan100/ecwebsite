
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
      { id: "101", name: "Luxury Oud Perfume", price: 450, image: "/p-1.jpg", rating: 5, reviews: "1.2k", brand: "Arabian Oud", almostSoldOut: false },
      { id: "102", name: "Desert Safari Gear", price: 250, image: "/p-2.jpg", rating: 4, reviews: "850", brand: "Desert Fox", almostSoldOut: true },
      { id: "103", name: "Premium Silk Kaftan", price: 890, image: "/p-3.jpg", rating: 5, reviews: "2.1k", brand: "Al-Karam", almostSoldOut: false },
      { id: "104", name: "Smart Home Hub", price: 599, image: "/p-4.jpg", rating: 4, reviews: "500", brand: "SmartLife", almostSoldOut: false }
    ]
  },
  {
    id: "china",
    name: "China",
    code: "CN",
    flag: "https://flagcdn.com/w80/cn.png",
    products: [
      { id: "201", name: "Ceramic Tea Set", price: 85, image: "/p-5.jpg", rating: 5, reviews: "3.5k", brand: "Jingdezhen", almostSoldOut: false },
      { id: "202", name: "Silk Robe", price: 120, image: "/p-6.jpg", rating: 5, reviews: "1.8k", brand: "SilkRoad", almostSoldOut: true },
      { id: "203", name: "Mechanical Gaming Keyboard", price: 150, image: "/p-7.jpg", rating: 4, reviews: "5.2k", brand: "RedDragon", almostSoldOut: false },
      { id: "204", name: "Bamboo Zen Garden", price: 45, image: "/p-8.jpg", rating: 4, reviews: "900", brand: "ZenLife", almostSoldOut: false }
    ]
  },
  {
    id: "pakistan",
    name: "Pakistan",
    code: "PK",
    flag: "https://flagcdn.com/w80/pk.png",
    products: [
      { id: "301", name: "Pashmina Shawl", price: 150, image: "/p-9.jpg", rating: 5, reviews: "2.4k", brand: "Kashmir Looms", almostSoldOut: false },
      { id: "302", name: "Leather Peshawari Chappal", price: 45, image: "/p-10.jpg", rating: 4, reviews: "1.5k", brand: "Peshawar Leather", almostSoldOut: true },
      { id: "303", name: "Himalayan Salt Lamp", price: 35, image: "/p-11.jpg", rating: 5, reviews: "3.1k", brand: "Himalayan Glow", almostSoldOut: false },
      { id: "304", name: "Cotton Kurta Set", price: 60, image: "/p-12.jpg", rating: 4, reviews: "1.2k", brand: "Gul Ahmed", almostSoldOut: false }
    ]
  },
  {
    id: "india",
    name: "India",
    code: "IN",
    flag: "https://flagcdn.com/w80/in.png",
    products: [
      { id: "401", name: "Copper Water Bottle", price: 25, image: "/p-13.jpg", rating: 4, reviews: "1.9k", brand: "Ayurveda Pure", almostSoldOut: false },
      { id: "402", name: "Assam Black Tea", price: 30, image: "/p-14.jpg", rating: 5, reviews: "2.8k", brand: "Assam Tea Co", almostSoldOut: true },
      { id: "403", name: "Handcrafted Spice Box", price: 55, image: "/p-1.jpg", rating: 5, reviews: "950", brand: "Masala Magic", almostSoldOut: false },
      { id: "404", name: "Organic Yoga Mat", price: 75, image: "/p-2.jpg", rating: 4, reviews: "1.6k", brand: "Yogi Life", almostSoldOut: false }
    ]
  },
  {
    id: "southafrica",
    name: "South Africa",
    code: "ZA",
    flag: "https://flagcdn.com/w80/za.png",
    products: [
      { id: "501", name: "Zulu Beaded Necklace", price: 55, image: "/p-3.jpg", rating: 5, reviews: "800", brand: "Zulu Beads", almostSoldOut: false },
      { id: "502", name: "Rooibos Tea Selection", price: 20, image: "/p-4.jpg", rating: 5, reviews: "1.5k", brand: "Cederberg Tea", almostSoldOut: true },
      { id: "503", name: "Leather Safari Hat", price: 85, image: "/p-5.jpg", rating: 4, reviews: "2.1k", brand: "Safari Gear", almostSoldOut: false },
      { id: "504", name: "African Print Tote", price: 40, image: "/p-6.jpg", rating: 4, reviews: "1.1k", brand: "Shweshwe Designs", almostSoldOut: false }
    ]
  },
  {
    id: "usa",
    name: "USA",
    code: "US",
    flag: "https://flagcdn.com/w80/us.png",
    products: [
      { id: "601", name: "Vintage Denim Jacket", price: 95, image: "/p-7.jpg", rating: 5, reviews: "4.5k", brand: "Levis", almostSoldOut: false },
      { id: "602", name: "Smart Noise-Cancelling Headphones", price: 349, image: "/p-8.jpg", rating: 5, reviews: "8.2k", brand: "Bose", almostSoldOut: true },
      { id: "603", name: "Artisan Coffee Roaster", price: 1200, image: "/p-9.jpg", rating: 5, reviews: "300", brand: "Coffee Tech", almostSoldOut: false },
      { id: "604", name: "National Park Poster Set", price: 65, image: "/p-10.jpg", rating: 4, reviews: "2.5k", brand: "National Parks", almostSoldOut: false }
    ]
  }
];
