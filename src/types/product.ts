import { StaticImageData } from "next/image";

export interface Product {
    id: string;
    name: string;
    brand?: string;
    image: string | StaticImageData;
    price: number;
    rating: number;
    reviews: string | number;
    almostSoldOut?: boolean;
    soldOut?: boolean;
}

export interface FeaturedProductCard {
    id: string;
    image: string | StaticImageData;
    title: string;
    subtitle?: string;
}

export interface Category {
    id?: string;
    name: string;
    image: string | StaticImageData;
}

export interface ProductItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

export interface ProductColor {
    name: string;
    value: string;
}

export interface ProductInfoProps {
    title: string;
    price: number;
    rating: number;
    reviewsCount: number;
    description: string;
    colors: ProductColor[];
    sizes: string[];
    category: string;
    subcategory: string;
}

export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface ProductTabsProps {
    description: string;
    reviews?: Review[];
    faqs?: FAQ[];
}

export interface ProductGalleryProps {
    images: string[];
}

