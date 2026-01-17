import {
  Bag,
  Camera,
  Car,
  Cream,
  Jacket,
  JoyStick,
  Laptop,
  Table,
} from "@/assets/images";
import { CategoriesView } from "@/components/home/CategoriesView";
import { HeroSection } from "@/components/home/HeroSection";
import { RecentCollections } from "@/components/home/RecentCollection";

const categoriesData = [
  {
    name: "Quilted Satin Jacket",
    image: Jacket,
  },
  {
    name: "Kids Electric Car",
    image: Car,
  },
  {
    name: "GP11 Shooter USB Gamepad",
    image: JoyStick,
  },
  {
    name: "ASUS FHD Gaming Laptop",
    image: Laptop,
  },
];

const rareFindsCategories = [
  {
    name: "CANON EOS DSLR Camera",
    image: Camera,
  },
  {
    name: "Curology Product Set",
    image: Cream,
  },
  {
    name: "Gucci duffle bag",
    image: Bag,
  },
  {
    name: "Small BookSelf",
    image: Table,
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentCollections />
      <CategoriesView
        titleBold='Browser'
        titleLight='Categories'
        subtitle='Have a look on what’s trending now!'
        categories={categoriesData}
        itemsPerView={4}
        showNavigation
      />
      <CategoriesView
        titleBold='Discover'
        titleLight='Rare finds'
        subtitle='Have a look on what’s trending now!'
        categories={rareFindsCategories}
        itemsPerView={4}
        showNavigation
      />
    </>
  );
}
