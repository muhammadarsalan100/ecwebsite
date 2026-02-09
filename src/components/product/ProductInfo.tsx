"use client";

import { useState } from "react";
import { Star, Share2, Truck, RefreshCw, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { ProductInfoProps } from "@/types";

export function ProductInfo({
    title,
    price,
    rating,
    reviewsCount,
    description,
    colors,
    sizes,
    category,
    subcategory,
}: ProductInfoProps) {
    const [selectedColor, setSelectedColor] = useState(colors[0]?.name);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
                    Shop
                </Link>
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                    {category}
                </Link>
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">{subcategory}</span>
            </nav>

            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-center text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={cn("w-5 h-5", i < Math.floor(rating) ? "fill-current" : "text-gray-300 dark:text-gray-600")}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({reviewsCount} reviews)</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
                    <span className={cn("text-sm", rating > 4 ? "text-green-600" : "text-gray-500")}>
                        In Stock
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
            </p>

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

            {/* Selectors */}
            <div className="space-y-6">
                {/* Colors */}
                <div>
                    <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">Colors Available</h3>
                    <div className="flex gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={cn(
                                    "h-6 w-6 rounded-full ring-offset-2 transition-all focus:outline-none dark:ring-offset-gray-950",
                                    selectedColor === color.name
                                        ? "ring-1 ring-black dark:ring-white scale-110"
                                        : "hover:scale-105"
                                )}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                                aria-label={`Select ${color.name}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Sizes */}
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Select Size</h3>
                            <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                                Size Guide <span className="text-lg">→</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full border text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                    selectedSize === size
                                        ? "border-gray-900 bg-gray-900 text-white dark:bg-white dark:text-black"
                                        : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-4">
                    <Button className="flex-1 bg-[#0092FF] hover:opacity-90 text-white h-12 rounded-lg font-medium text-base" size="lg">
                        <Share2 className="w-4 h-4 mr-2" />
                        <span>Add to cart</span>
                    </Button>
                    <div className="h-12 px-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-900 font-bold bg-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 min-w-[120px]">
                        ${price.toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-800" />

            {/* Services / Trust Badges */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                        <ShieldCheck className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Secure payment</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                        <div className="relative">
                            {/* Simple shirt icon representation or similar */}
                            <span className="font-bold text-lg select-none">T</span>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Size & Fit</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                        <Truck className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Free shipping</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                        <RefreshCw className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 block">Free Shipping</span>
                        <span className="text-xs text-gray-500 block">& Returns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
