"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { useConfigStore } from "@/lib/store/configStore";

export const EmptyCart = () => {
    const { activeCategoryId } = useConfigStore();
    return (
        <>
            <CategoryNavBar />
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-12 h-12 text-gray-200" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8 max-w-xs text-center">Looks like you haven&apos;t added anything to your cart yet.</p>
                <Link
                    href={activeCategoryId ? `/category/${activeCategoryId}` : "/"}
                    className="px-8 py-3 bg-[#0092FF] text-white font-bold rounded-xl hover:bg-[#0081E0] transition-colors shadow-lg shadow-blue-500/20"
                >
                    Start Shopping
                </Link>
            </div>
        </>
    );
};
