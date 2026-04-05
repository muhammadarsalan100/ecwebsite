"use client";

import Image from "next/image";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCartStore } from "@/lib/store/cartStore";
import { authService } from "@/services/authService";
import { cn } from "@/lib/utils";
import { Toast, ToastType } from "@/components/ui/toast";

interface ProductCardProps {
    product: Product;
    variant?: "default" | "minimal";
    className?: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

export const ProductCard = ({ product, variant = "default", className = "" }: ProductCardProps) => {
    const { isAuthenticated } = useAuth();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: ToastType }>({
        isVisible: false,
        message: "",
        type: "info"
    });

    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            setToast({
                isVisible: true,
                message: "Please login to add items to your cart",
                type: "auth"
            });
            return;
        }

        try {
            setIsAddingToCart(true);
            addItem({
                id: product.id,
                listingId: Number(product.listingId ?? 0),
                itemId: Number(product.itemId ?? 0),
                title: product.name,
                price: Number(product.price),
                image: product.image || "/p-1.jpg",
                quantity: 1,
            });

            setToast({
                isVisible: true,
                message: `${product.name} added to cart!`,
                type: "success"
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
            setToast({
                isVisible: true,
                message: "Failed to add to cart.",
                type: "error"
            });
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            setToast({
                isVisible: true,
                message: "Please login to add items to your wishlist",
                type: "auth"
            });
            return;
        }

        if (isWishlisted) {
            setToast({
                isVisible: true,
                message: "Item is already in your wishlist",
                type: "info"
            });
            return;
        }

        try {
            setIsAdding(true);
            const response = await authService.addToWishlist(product.id);
            if (response.code === "Created" || response.code === "OK") {
                setIsWishlisted(true);
                setToast({
                    isVisible: true,
                    message: "Product added to wishlist successfully!",
                    type: "success"
                });
            }
        } catch (error: any) {
            console.error("Error adding to wishlist:", error);
            if (error.message?.toLowerCase().includes("already")) {
                setIsWishlisted(true);
                setToast({
                    isVisible: true,
                    message: "Item is already in your wishlist",
                    type: "info"
                });
            } else {
                setToast({
                    isVisible: true,
                    message: error.message || "Failed to add to wishlist.",
                    type: "error"
                });
            }
        } finally {
            setIsAdding(false);
        }
    };

    const discountPercentage = product.originalPrice && product.isPromotionApplied && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <motion.div
            className={cn(
                "group cursor-pointer bg-white rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-[#0092FF]/5 shadow-sm hover:shadow-[0_20px_50px_rgba(0,146,255,0.12)] transition-all duration-500 flex flex-col h-full w-full relative",
                className
            )}
            variants={itemVariants}
            whileHover={{ y: -10 }}
        >
            <Link href={`/product/${product.id}`} className="block flex-1 flex flex-col">
                {/* Image Container with Floating Action Layer */}
                <div className="relative aspect-[1/1] m-2 sm:m-3 overflow-hidden rounded-[1.2rem] sm:rounded-[2rem] bg-gray-50/50 group/img">
                    <Image
                        src={product.image || "/p-1.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain p-3 sm:p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay for better contrast on badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Elite Glassmorphism Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                        {discountPercentage && (
                            <div className="bg-[#0092FF] text-white px-3 py-1.5 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center gap-1.5 ring-1 ring-white/20">
                                <span className="text-[11px] font-bold tracking-tight">-{discountPercentage}%</span>
                            </div>
                        )}
                        {product.stockMessage && (
                            <div className="bg-white/80 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/50 shadow-sm ring-1 ring-black/5">
                                <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-[0.1em]">
                                    {product.stockMessage}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Side Floating Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 lg:group-hover:opacity-100 translate-x-4 lg:group-hover:translate-x-0 transition-all duration-500 delay-75">
                        <button
                            onClick={handleWishlist}
                            disabled={isAdding}
                            className={cn(
                                "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-2xl ring-1 ring-black/5",
                                isWishlisted
                                    ? "bg-red-500 text-white"
                                    : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white"
                            )}
                        >
                            <Heart
                                className={cn(
                                    "w-5 h-5 transition-all duration-300",
                                    isWishlisted && "fill-current scale-110",
                                    isAdding && "animate-pulse"
                                )}
                            />
                        </button>
                    </div>
                </div>

                {/* Highly Refined Content Section */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2 flex flex-col flex-1">
                    {/* Category/Brand Badge */}
                    <div className="mb-3">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0092FF]/60 bg-[#0092FF]/5 px-2.5 py-1 rounded-lg">
                            {product.brand || "MegaMart Elite"}
                        </span>
                    </div>

                    {/* Title with improved leading */}
                    <h3 className="text-sm sm:text-[16px] leading-[1.4] font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#0092FF] transition-colors line-clamp-2 min-h-[38px] sm:min-h-[44px]">
                        {product.name}
                    </h3>

                    {/* Premium Rating Indicator */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5",
                                        i < Math.floor(product.rating)
                                            ? "fill-orange-400 text-orange-400"
                                            : "fill-gray-100 text-gray-200"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] sm:text-[12px] text-gray-400 font-semibold tracking-tight">
                            {Number(product.reviews) > 0 ? `${product.rating} (${product.reviews})` : "New Arrival"}
                        </span>
                    </div>

                    {/* Grand Finale Price & Action Row */}
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            {product.isPromotionApplied && product.originalPrice && (
                                <span className="text-[13px] text-gray-400 line-through font-medium mb-1 decoration-[#0092FF]/30">
                                    {product.currencyCode || "AED"} {product.originalPrice.toFixed(2)}
                                </span>
                            )}

                            <div className="flex items-baseline gap-0.5 sm:gap-1 group/price">
                                <span className="text-[10px] sm:text-sm font-extrabold text-[#0092FF]">{product.currencyCode || "AED"}</span>
                                <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-tighter">
                                    {Math.floor(product.price)}
                                </span>
                                <span className="text-[10px] sm:text-sm font-bold text-gray-600">
                                    .{(product.price % 1).toFixed(2).split('.')[1]}
                                </span>
                            </div>
                        </div>

                        {/* Enhanced Shopping Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className={cn(
                                "group/btn relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 overflow-hidden",
                                isAddingToCart
                                    ? "bg-[#0092FF] text-white"
                                    : "bg-gray-950 text-white hover:bg-[#0092FF] shadow-lg shadow-black/10 hover:shadow-blue-500/30"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <ShoppingCart className={cn(
                                "w-5 h-5 transition-all duration-500 z-10",
                                !isAddingToCart && "group-hover/btn:scale-110 group-hover/btn:-rotate-12",
                                isAddingToCart && "animate-bounce"
                            )} />
                        </button>
                    </div>
                </div>
            </Link>

            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                duration={toast.type === "auth" ? 8000 : 3000}
                action={toast.type === "auth" ? {
                    label: "Login",
                    onClick: () => router.push("/auth")
                } : undefined}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />
        </motion.div>
    );
};

