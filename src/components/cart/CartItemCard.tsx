"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, CheckCircle2, Truck } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemCardProps {
    item: CartItem;
    onUpdateQuantity: (id: string | number, quantity: number, color?: string, size?: string) => void;
    onRemove: (id: string | number, color?: string, size?: string) => void;
    currencySymbol: string;
}

export const CartItemCard = ({ item, onUpdateQuantity, onRemove, currencySymbol }: CartItemCardProps) => {
    return (
        <div className="bg-white rounded-[24px] p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border border-gray-50 shadow-sm relative group">
            {/* Product Image */}
            <div className="w-full sm:w-40 h-48 sm:h-40 bg-[#F8F9FA] rounded-2xl flex items-center justify-center p-4 shrink-0 relative overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between w-full min-h-[120px]">
                <div className="w-full">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight pr-6 sm:pr-8">
                        {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                        {item.color && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-black border border-gray-100" />
                                <span className="text-xs font-medium text-gray-500">{item.color}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-[#0092FF]">
                            <Truck className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold">Free Delivery</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#22C55E]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold">Guaranteed</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-end sm:items-center justify-between mt-auto w-full">
                    <div className="flex flex-col">
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
                            {currencySymbol}{(item.price * 1.2).toFixed(2)}
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                            {currencySymbol}{item.price.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Quantity Selector */}
                        <div className="flex items-center bg-[#F8F9FA] rounded-full p-0.5 sm:p-1 border border-gray-100">
                            <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-bold text-gray-900">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => onRemove(item.id, item.color, item.size)}
                            className="p-1.5 sm:p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
