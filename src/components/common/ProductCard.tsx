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
                "group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full w-full relative",
                className
            )}
            variants={itemVariants}
            whileHover={{ y: -8 }}
        >
            <Link href={`/product/${product.id}`} className="block flex-1">
                {/* Image Container */}
                <div className="relative aspect-[1/1.1] bg-muted/30 overflow-hidden rounded-t-2xl">
                    <Image
                        src={product.image || "/p-1.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Badge Overlays */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {discountPercentage && (
                            <div className="bg-primary text-white px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md bg-opacity-90">
                                <span className="text-[10px] font-bold">-{discountPercentage}% Off</span>
                            </div>
                        )}
                        {product.stockMessage && (
                            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                                <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">
                                    {product.stockMessage}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <button
                            onClick={handleWishlist}
                            disabled={isAdding}
                            className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-md",
                                isWishlisted
                                    ? "bg-destructive text-white"
                                    : "bg-white/90 text-gray-500 hover:text-destructive hover:bg-white"
                            )}
                        >
                            <Heart
                                className={cn(
                                    "w-4.5 h-4.5 transition-all duration-300",
                                    isWishlisted && "fill-current scale-110",
                                    isAdding && "animate-pulse"
                                )}
                            />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1">
                    {/* Brand */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                            {product.brand || "ZRGOTH Shop"}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[14px] leading-tight font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-3 h-3",
                                        i < Math.floor(product.rating)
                                            ? "fill-amber-400 text-amber-400"
                                            : "fill-muted text-muted"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[12px] text-muted-foreground font-medium">({product.reviews})</span>
                    </div>

                    {/* Price & Action Row */}
                    <div className="flex items-end justify-between mt-auto">
                        <div className="flex flex-col">
                            {product.isPromotionApplied && product.originalPrice && (
                                <span className="text-[12px] text-muted-foreground/60 line-through leading-none mb-1">
                                    {product.currencyCode || "AED"} {product.originalPrice.toFixed(2)}
                                </span>
                            )}

                            <div className="flex items-baseline gap-1 animate-in fade-in slide-in-from-bottom-1 duration-500">
                                <span className="text-sm font-bold text-foreground">{product.currencyCode || "AED"}</span>
                                <span className="text-xl font-bold text-foreground tracking-tight">
                                    {Math.floor(product.price)}
                                </span>
                                <span className="text-sm font-bold text-foreground">
                                    .{(product.price % 1).toFixed(2).split('.')[1]}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className={cn(
                                "group/btn w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground active:scale-95",
                                isAddingToCart ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                            )}
                        >
                            <ShoppingCart className={cn("w-5 h-5 transition-transform group-hover/btn:scale-110", isAddingToCart && "animate-bounce")} />
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
