"use client";

import { Loader2 } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";

interface RelatedProductsProps {
    isLoading: boolean;
    products: any[];
}

export const RelatedProducts = ({ isLoading, products }: RelatedProductsProps) => {
    return (
        <div className="mt-20">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-8 px-2">Customers who viewed items in your browsing history also viewed</h2>
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-[#0092FF] animate-spin" />
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: String(product.id),
                                name: product.name,
                                price: product.price,
                                image: product.images[0]?.url || product.icon || "",
                                rating: product.rating || 5,
                                reviews: 0
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">No recently viewed items found.</p>
                </div>
            )}
        </div>
    );
};
