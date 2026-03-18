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
    const { isAuthenticated, user } = useAuth();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: ToastType }>({
        isVisible: false,
        message: "",
        type: "info"
    });

    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

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
                "group cursor-pointer bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full w-full font-poppins",
                className
            )}
            variants={itemVariants}
            whileHover={{ y: -5 }}
        >
            <Link href={`/product/${product.id}`} className="block flex-1">
                {/* Image Container */}
                <div className="relative aspect-[1/1.2] bg-[#F7F8FA] overflow-hidden">
                    <Image
                        src={product.image || "/p-1.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Floating Wishlist Button */}
                    <button
                        onClick={handleWishlist}
                        disabled={isAdding}
                        className={cn(
                            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                            isWishlisted
                                ? "bg-red-50 text-red-500 shadow-sm"
                                : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white shadow-md active:scale-90"
                        )}
                    >
                        <Heart
                            className={cn(
                                "w-4 h-4 transition-transform duration-300",
                                isWishlisted && "fill-current scale-110",
                                isAdding && "animate-pulse"
                            )}
                        />
                    </button>

                    {/* Discount Badge Overlay */}
                    {discountPercentage && (
                        <div className="absolute top-3 left-3 bg-[#FF4646] px-2 py-0.5 rounded-sm shadow-sm z-10">
                            <span className="text-[10px] font-bold text-white">-{discountPercentage}%</span>
                        </div>
                    )}

                    {/* Stock Status Badge */}
                    {product.stockMessage && (
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-black/5 shadow-sm">
                            <span className="text-[10px] font-bold text-[#FF4646] uppercase tracking-tight">
                                {product.stockMessage}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-3 flex flex-col">
                    {/* Brand/Subtitle */}
                    <div className="flex items-center gap-1.5 mb-1 opacity-60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            {product.brand || "ZRGOTH Essentials"}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[13px] leading-[1.4] font-normal text-gray-700 line-clamp-2 min-h-[36px] mb-2 group-hover:text-[#0092FF] transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-2.5 h-2.5",
                                        i < Math.floor(product.rating) ? "fill-[#FF9900] text-[#FF9900]" : "fill-gray-200 text-gray-200"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">({product.reviews})</span>
                    </div>

                    {/* Price & Cart Row */}
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            {/* Original Price (Strike-through) */}
                            {product.isPromotionApplied && product.originalPrice && (
                                <span className="text-[11px] text-gray-400 line-through leading-none mb-0.5">
                                    {product.currencyCode || "$"} {product.originalPrice.toFixed(2)}
                                </span>
                            )}

                            <div className="flex items-baseline gap-1">
                                <span className="text-xs font-bold text-[#FF4646]">{product.currencyCode || "$"}</span>
                                <span className="text-lg font-bold text-[#FF4646] tracking-tight -ml-0.5">
                                    {Math.floor(product.price)}
                                </span>
                                <span className="text-xs font-bold text-[#FF4646]">
                                    .{(product.price % 1).toFixed(2).split('.')[1]}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-gray-100 group-hover:bg-[#0092FF] group-hover:border-[#0092FF] group-hover:text-white shadow-sm active:scale-90",
                                isAddingToCart ? "bg-[#0092FF] text-white opacity-70" : "bg-white text-gray-600"
                            )}
                        >
                            <ShoppingCart className={cn("w-4 h-4", isAddingToCart && "animate-bounce")} />
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
