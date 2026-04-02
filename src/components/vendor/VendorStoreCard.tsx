"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Users, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { VendorStore } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface VendorStoreCardProps {
    vendor: VendorStore;
}

export function VendorStoreCard({ vendor }: VendorStoreCardProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-[32px] p-6 mb-6 shadow-sm border border-gray-100 dark:border-gray-800"
        >
            {/* Store Header */}
            <div className="flex items-center justify-between mb-6">
                <Link 
                    href={`/store/${vendor.storeId}`}
                    className="flex items-center gap-4 group/header cursor-pointer"
                >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-800 bg-gray-50 flex-shrink-0 group-hover/header:border-[#0092FF]/30 transition-all">
                        {vendor.logo ? (
                            <Image 
                                src={vendor.logo} 
                                alt={vendor.storeName} 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold text-xl group-hover/header:text-[#0092FF] transition-colors">
                                {vendor.storeName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover/header:text-[#0092FF] transition-colors">
                            {vendor.storeName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                            <span>
                                {vendor.followersCount} {vendor.followersCount === 1 ? 'follower' : 'followers'}
                            </span>
                            <span className="text-gray-300 font-bold">·</span>
                            <span>
                                Sold items: 0
                            </span>
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {!vendor.isFollowed ? (
                        <button className="px-7 py-2.5 bg-[#0092FF] text-white text-[13px] font-bold rounded-xl hover:bg-[#0081E0] transition-colors shadow-lg shadow-blue-500/10 active:scale-95">
                            Follow
                        </button>
                    ) : (
                        <Link 
                            href={`/store/${vendor.storeId}`}
                            className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-300 hover:text-[#0092FF] hover:border-[#0092FF]/30 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Top Items Grid */}
            <div className="grid grid-cols-3 gap-3">
                {vendor.topItems.slice(0, 3).map((item, idx) => (
                    <div 
                        key={idx}
                        className="relative aspect-square bg-[#F8F9FA] dark:bg-gray-800/40 rounded-3xl overflow-hidden group cursor-pointer transition-all hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                    >
                        {item.logo ? (
                            <Image 
                                src={item.logo} 
                                alt={item.itemName} 
                                fill 
                                className="object-contain p-5"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <ShoppingBag className="w-8 h-8 opacity-20" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
                
                {/* Fallback empty slots if less than 3 items */}
                {Array.from({ length: Math.max(0, 3 - vendor.topItems.length) }).map((_, idx) => (
                    <div 
                        key={`empty-${idx}`}
                        className="aspect-square bg-[#F8F9FA] dark:bg-gray-800/40 rounded-3xl flex items-center justify-center border border-gray-50 dark:border-gray-800/50"
                    >
                        <ShoppingBag className="w-8 h-8 text-gray-200 dark:text-gray-700 opacity-40" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
