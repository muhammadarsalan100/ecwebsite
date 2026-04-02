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
                        // Robust mapping to handle various API structures
                        const name = item.name || item.productName || item.item?.itemName || item.catalogItem?.name || "Product Name";
                        const brand = item.brand || item.brandName || item.vendor?.fullName || item.item?.itemBrand || item.catalogItem?.vendor?.fullName || "MegaMart Elite";
                        
                        const image = item.image ||
                            item.imageUrl ||
                            (item.images && Array.isArray(item.images) && item.images[0]?.url) ||
                            item.icon ||
                            item.item?.icon ||
                            item.catalogItem?.icon;

                        const price = Number(item.price || item.unitPrice || 0);

                        return (
                            <div key={item.id} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-[#0092FF]/5 shadow-sm hover:shadow-[0_20px_50px_rgba(0,146,255,0.12)] transition-all duration-500">
                                {/* Product Image Container */}
                                <div className="relative aspect-square m-3 overflow-hidden rounded-[2rem] bg-gray-50/50 flex items-center justify-center group-hover/img">
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={name}
                                            width={240}
                                            height={240}
                                            className="object-contain p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-200">
                                            <Package className="w-16 h-16 stroke-[1.5]" />
                                            <span className="text-[10px] mt-2 font-bold tracking-[0.2em] uppercase">No Image</span>
                                        </div>
                                    )}
                                    
                                    {/* Action Glass Badge (Remove) */}
                                    <button 
                                        onClick={() => handleRemove(item.id)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm flex items-center justify-center text-red-400 hover:text-red-500 hover:scale-110 transition-all duration-300 z-10"
                                        title="Remove from wishlist"
                                    >
                                        <Trash2 className="w-4.5 h-4.5" />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
                                    {/* Brand Badge */}
                                    <div className="mb-3">
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0092FF]/60 bg-[#0092FF]/5 px-2.5 py-1 rounded-lg">
                                            {brand}
                                        </span>
                                    </div>

                                    <h3 className="text-[15px] leading-[1.4] font-bold text-gray-900 mb-4 group-hover:text-[#0092FF] transition-colors line-clamp-2 min-h-[42px]" title={name}>
                                        {name}
                                    </h3>

                                    {/* Actions & Price Row */}
                                    <div className="mt-auto flex items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-extrabold text-[#0092FF]">AED</span>
                                            <span className="text-xl font-black text-gray-900 tracking-tighter">
                                                {price.toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            className="flex-1 h-12 bg-gray-950 hover:bg-[#0092FF] text-white rounded-2xl text-[12px] font-bold flex items-center justify-center gap-2 transition-all duration-500 shadow-lg shadow-black/10 hover:shadow-blue-500/30 group/btn overflow-hidden relative"
                                        >
                                             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-transform" />
                                            <span>Add to cart</span>
                                        </button>
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
