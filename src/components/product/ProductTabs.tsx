"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";

interface ProductTabsProps {
    description: string;
    reviews?: unknown[];
    faqs?: unknown[];
}

const tabs = [
    { id: "description", label: "Description", count: null },
    { id: "comments", label: "User comments", count: 21 },
    { id: "qna", label: "Question & Answer", count: 4 },
];

const productDetails = [
    { label: "Fabric", value: "Bio-washed Cotton" },
    { label: "Pattern", value: "Printed" },
    { label: "Fit", value: "Regular-fit" },
    { label: "Neck", value: "Round Neck" },
    { label: "Sleeve", value: "Half-sleeves" },
    { label: "Style", value: "Casual Wear" },
];

export function ProductTabs({ description }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex gap-8 overflow-x-auto pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative flex items-center gap-2 text-base font-medium transition-colors whitespace-nowrap",
                                activeTab === tab.id
                                    ? "text-gray-900 dark:text-gray-100"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            )}
                        >
                            <span>{tab.label}</span>
                            {tab.count !== null && (
                                <span className={cn(
                                    "flex h-5 w-6 items-center justify-center rounded text-xs font-bold",
                                    activeTab === tab.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-900 text-white dark:bg-gray-700"
                                )}>
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "description" && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Left Content */}
                                <div className="lg:col-span-2">
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                        {description}
                                    </p>

                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-4">
                                            {productDetails.map((detail, idx) => (
                                                <div key={idx} className={cn(
                                                    "flex flex-col gap-1",
                                                    // Add border right for all except every 3rd item (last in row on desktop)
                                                    (idx + 1) % 3 !== 0 && "md:border-r border-gray-200 dark:border-gray-800",
                                                    // Add border right for md screens? The grid logic for borders is tricky, simpler is just spacing.
                                                    // Let's stick to simple spacing or use specific borders.
                                                    // The image shows clean grid with dividers.
                                                )}>
                                                    <div className="px-4">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
                                                            {detail.label}
                                                        </span>
                                                        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                                            {detail.value}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content - Video Card */}
                                <div className="lg:col-span-1">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 group cursor-pointer">
                                        <Image
                                            src="/p-4.jpg" // Using one of the product images as placeholder
                                            alt="Video thumbnail"
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                                <Play className="h-6 w-6 text-gray-900 fill-gray-900 ml-1" />
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <p className="text-sm font-medium text-center">Raven Hoodie with black colored design</p>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                                                1:00 M
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "comments" && (
                            <div className="text-gray-600 dark:text-gray-400">
                                <p>User comments will appear here.</p>
                            </div>
                        )}
                        {activeTab === "qna" && (
                            <div className="text-gray-600 dark:text-gray-400">
                                <p>Questions & Answers will appear here.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
