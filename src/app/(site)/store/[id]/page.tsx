"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, MessageCircle, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { authService } from "@/services/authService";
import { StoreDetail } from "@/types/vendor";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";

export default function StoreDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [store, setStore] = useState<StoreDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStore = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const response = await authService.getStoreDetail(id);
                if (response?.data) {
                    setStore(response.data);
                }
            } catch (err: any) {
                console.error("Failed to fetch store:", err);
                setError(err.message || "Failed to load store details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStore();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#0092FF] animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Opening store...</p>
            </div>
        );
    }

    if (error || !store) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Store not found</h2>
                <p className="text-gray-500 mb-8">{error || "The store you're looking for doesn't exist."}</p>
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0092FF] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    // Mock products for the grid as specified in the mockup image
    const mockProducts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        image: `/p-${(i % 5) + 1}.jpg` // Using existing sample images p-1.jpg to p-5.jpg
    }));

    return (
        <div className="min-h-screen bg-[#F5F6F8] dark:bg-gray-950 pb-20">
            <CategoryNavBar />
            
            <div className="max-w-4xl mx-auto md:mt-8 px-4 md:px-0">
                {/* Mobile Header Mockup Look */}
                <div className="flex items-center justify-between py-6 md:hidden">
                   <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                        <ChevronLeft className="w-6 h-6" />
                   </button>
                   <h1 className="text-lg font-bold">Store</h1>
                   <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Profile Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-[40px] md:rounded-[48px] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800"
                >
                    {/* Store Identity */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[32px] overflow-hidden border-4 border-gray-50 dark:border-gray-800 bg-gray-50 flex-shrink-0">
                            {store.logo ? (
                                <Image src={store.logo} alt={store.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-300 font-bold text-3xl">
                                    {store.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {store.name}
                            </h2>
                            
                            {/* Stats Row */}
                            <div className="flex items-center gap-8 md:gap-12">
                                <div className="text-center md:text-left">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">16</div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Posts</div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">{store.followersCount}</div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Followers</div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">{store.totalSold}</div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sold Items</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 leading-relaxed max-w-2xl">
                        {store.description || "Building a world of style and quality."}
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex-1 py-4 bg-[#0092FF] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all hover:bg-[#0081E0]">
                            Follow
                        </button>
                        <button className="flex-1 py-4 bg-[#E2E8F0] dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-gray-200">
                            <MessageCircle className="w-5 h-5" />
                            Message
                        </button>
                    </div>
                </motion.div>

                {/* Products Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Products</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                        {mockProducts.map((p, idx) => (
                            <motion.div 
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx % 3 * 0.1 }}
                                className="aspect-square bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm relative group cursor-pointer"
                            >
                                {/* In a real app, this would use the store's product images */}
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <ShoppingBag className="w-8 h-8 text-gray-100 dark:text-gray-800" />
                                </div>
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
