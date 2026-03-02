"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/types";

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

export const ProductCard = ({ product, variant = "default", className = "" }: ProductCardProps) => (
    <motion.div
        className={`cursor-pointer bg-white rounded-2xl shadow-[0_36px_82px_0_rgba(0,0,0,0.06)] px-4 sm:px-[22px] pt-3 sm:pt-[13px] pb-6 sm:pb-8 flex flex-col h-full max-w-sm mx-auto w-full ${className}`}
        variants={itemVariants}
        whileHover={{
            y: -10,
            boxShadow: "0 40px 90px 0 rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
        }}
    >
        <Link href={`/product/${product.id}`} className="block h-full w-full">
            <div className='relative w-full aspect-[3/2] mb-3 sm:mb-4 bg-[#F5F5F5] rounded-[9px] min-h-[180px] sm:min-h-[200px]'>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-contain p-2'
                />
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
                    ${product.price.toFixed(2)}
                </p>

                {product.almostSoldOut && (
                    <p className='text-[#FF4646] text-[10px] sm:text-[11px] font-normal leading-[18px] tracking-tight text-right font-poppins'>
                        Almost Sold Out
                    </p>
                )}
            </div>
        </Link>
    </motion.div>
);
