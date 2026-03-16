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
                image: product.image,
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

    return (
        <motion.div
            className={`cursor-pointer bg-white rounded-2xl shadow-[0_36px_82px_0_rgba(0,0,0,0.06)] px-4 sm:px-[22px] pt-3 sm:pt-[13px] pb-6 sm:pb-8 flex flex-col h-full max-w-sm mx-auto w-full group/card ${className}`}
            variants={itemVariants}
            whileHover={{
                y: -10,
                boxShadow: "0 40px 90px 0 rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
            }}
        >
            <Link href={`/product/${product.id}`} className="block h-full w-full relative">
                {/* Image Container with Wishlist Button */}
                <div className='relative w-full aspect-[3/2] mb-3 sm:mb-4 bg-[#F5F5F5] rounded-[9px] min-h-[180px] sm:min-h-[200px] flex items-center justify-center overflow-hidden'>
                    <Image
                        src={product.image || "/p-1.jpg"}
                        alt={product.name}
                        fill
                        className='object-contain p-2 group-hover/card:scale-105 transition-transform duration-500'
                    />

                    {/* Wishlist Heart Icon */}
                    <button
                        onClick={handleWishlist}
                        disabled={isAdding}
                        className={cn(
                            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                            isWishlisted
                                ? "bg-red-50 text-red-500 shadow-sm"
                                : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm"
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

                    {/* Hover Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className='flex items-start justify-between gap-2'>
                    <div className="flex-1 min-w-0">
                        <h3 className='text-[#484848] text-base sm:text-[18px] font-medium leading-normal font-poppins truncate'>
                            {product.name}
                        </h3>
                        <p className='text-[#8A8A8A] text-[10px] sm:text-[11px] font-medium leading-[11px] mt-1 font-poppins'>
                            {product.brand}
                        </p>
                    </div>

                    <div className='flex items-center gap-0.5 shrink-0'>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < product.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"}`}
                            />
                        ))}
                    </div>
                </div>

                <p className='mt-2 text-[#484848] text-[10px] sm:text-[11px] font-medium leading-normal font-poppins'>
                    ({product.reviews}) Customer Reviews
                </p>

                <div className='flex items-center justify-between mt-4 sm:mt-6'>
                    <p className='text-[#484848] text-lg sm:text-[22px] font-medium leading-[18px] tracking-tight font-poppins'>
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </p>

                    {product.almostSoldOut && (
                        <p className='text-[#FF4646] text-[10px] sm:text-[11px] font-normal leading-[18px] tracking-tight text-right font-poppins'>
                            Almost Sold Out
                        </p>
                    )}
                </div>
            </Link>

            <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={cn(
                    "mt-4 w-full h-11 bg-[#0092FF] hover:bg-[#0081E0] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95",
                    isAddingToCart && "opacity-70 cursor-not-allowed"
                )}
            >
                <ShoppingCart className="w-4 h-4" />
                <span>{isAddingToCart ? "Adding..." : "Add to cart"}</span>
            </button>

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
