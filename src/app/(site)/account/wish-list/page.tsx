"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Heart, Package } from "lucide-react";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toast, ToastType } from "@/components/ui/toast";

interface WishListItem {
    id: number | string;
    name?: string;
    productName?: string;
    brand?: string;
    brandName?: string;
    image?: string;
    imageUrl?: string;
    images?: { url: string }[];
    price?: number;
    vendor?: { fullName: string };
    [key: string]: any;
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: ToastType }>({
        isVisible: false,
        message: "",
        type: "info"
    });

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const response = await authService.getWishlist();
                if (response.code === "OK") {
                    setWishlist(response.data || []);
                } else {
                    setError("Failed to fetch wishlist");
                }
            } catch (err: any) {
                console.error("Error fetching wishlist:", err);
                setError(err.message || "An error occurred while loading your wishlist");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (id: number | string) => {
        try {
            const response = await authService.removeFromWishlist(id);
            if (response.code === "OK") {
                setWishlist(prev => prev.filter(item => item.id !== id));
                setToast({
                    isVisible: true,
                    message: "Item removed from your wishlist",
                    type: "success"
                });
            } else {
                setToast({
                    isVisible: true,
                    message: response.message || "Failed to remove item",
                    type: "error"
                });
            }
        } catch (err: any) {
            console.error("Error removing from wishlist:", err);
            setToast({
                isVisible: true,
                message: err.message || "An error occurred while removing the item",
                type: "error"
            });
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-8 animate-pulse p-4 lg:p-0">
                <div className="space-y-3">
                    <div className="h-9 w-40 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-60 bg-gray-100 rounded-md"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col">
                            <div className="aspect-square bg-gray-100 rounded-[32px] mb-5"></div>
                            <div className="h-5 w-3/4 bg-gray-100 rounded mb-2"></div>
                            <div className="h-3 w-1/4 bg-gray-50 rounded mb-6"></div>
                            <div className="flex gap-3">
                                <div className="h-10 flex-1 bg-gray-50 rounded-xl"></div>
                                <div className="h-10 w-10 bg-gray-50 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-[32px]" style={{ fontFamily: "var(--font-poppins)" }}>
            {/* Header */}
            <header className="mb-10 px-2 lg:px-0">
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                    Wish List
                </h1>
                <p className="text-gray-400 text-[14px] mt-1">
                    See your favorites list here
                </p>
            </header>

            {wishlist.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-6 shadow-sm">
                        <Heart className="w-10 h-10 text-gray-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-400 max-w-xs mb-8">
                        Seems like you haven't added any products to your wishlist yet.
                    </p>
                    <Button
                        onClick={() => window.location.href = "/"}
                        className="h-12 px-10 rounded-2xl font-bold shadow-lg shadow-blue-500/10"
                    >
                        Explore Products
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 px-2 lg:px-0">
                    {wishlist.map((item) => {
                        // Log items briefly if images are missing to help debug (optional but good for now)
                        if (process.env.NODE_ENV === 'development') {
                            console.log('Wishlist item mapping check:', item);
                        }

                        // Robust mapping to handle various API structures (flat or nested)
                        const name = item.name || item.productName || item.item?.itemName || item.catalogItem?.name || "Product Name";
                        const brand = item.brand || item.brandName || item.vendor?.fullName || item.item?.itemBrand || item.catalogItem?.vendor?.fullName || "Brand Name";

                        // Image hierarchy: image -> imageUrl -> images array -> item.icon -> item.item.icon
                        const image = item.image ||
                            item.imageUrl ||
                            (item.images && Array.isArray(item.images) && item.images[0]?.url) ||
                            item.icon ||
                            item.item?.icon ||
                            item.catalogItem?.icon;

                        return (
                            <div key={item.id} className="group flex flex-col">
                                {/* Product Image Container */}
                                <div className="relative aspect-square w-full bg-[#F5F5F5] rounded-[24px] overflow-hidden flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={name}
                                            width={200}
                                            height={200}
                                            className="object-contain p-8 mix-blend-multiply"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-300">
                                            <Package className="w-16 h-16 stroke-[1.5]" />
                                            <span className="text-[10px] mt-2 font-medium tracking-wider uppercase">No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="px-1 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-800 text-[15px] mb-0.5" title={name}>
                                        {name}
                                    </h3>
                                    <p className="text-[11px] text-gray-400 font-medium mb-5 uppercase tracking-wide">
                                        {brand}
                                    </p>

                                    {/* Actions */}
                                    <div className="mt-auto flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1 h-10 rounded-xl border-[#0092FF] text-[#0092FF] hover:bg-blue-50 text-[12px] font-bold gap-2 px-3"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleRemove(item.id)}
                                            className="w-10 h-10 p-0 rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />
        </div>
    );
}
