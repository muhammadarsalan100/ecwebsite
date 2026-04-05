"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";

import { ProductTabsProps } from "@/types";
import { ProductGalleryModal } from "./ProductGalleryModal";

export function ProductTabs({ 
    shortDescription, 
    longDescription, 
    reviewsCount = 0, 
    faqs = [], 
    technicalAttributes = [],
    videos = [],
    images = []
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("description");
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

    const tabs = [
        { id: "description", label: "Description", count: null },
        { id: "comments", label: "User comments", count: reviewsCount },
        { id: "qna", label: "Question & Answer", count: faqs.length },
    ];

    // Combine videos and images for the gallery modal
    const galleryItems = [
        ...videos.map(v => ({ type: "video" as const, url: v.thumbnailUrl || images[0] || "/p-4.jpg", title: v.title, duration: v.duration, thumbnailUrl: v.thumbnailUrl })),
        ...images.map(img => ({ type: "image" as const, url: img }))
    ];

    const firstItem = galleryItems[0];

    return (
        <div className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-4 custom-scrollbar">
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
                                    <div 
                                        className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 product-description"
                                        dangerouslySetInnerHTML={{ __html: longDescription || shortDescription }}
                                    />

                                    {technicalAttributes && technicalAttributes.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-4">
                                                {technicalAttributes.map((detail, idx) => (
                                                    <div key={idx} className={cn(
                                                        "flex flex-col gap-1",
                                                        (idx + 1) % 3 !== 0 && "md:border-r border-gray-200 dark:border-gray-800",
                                                    )}>
                                                        <div className="px-4">
                                                            <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
                                                                {detail.name}
                                                            </span>
                                                            <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                                                {detail.value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Content - Video & Image Preview */}
                                {firstItem && (
                                    <div className="lg:col-span-1 flex justify-center lg:justify-end">
                                        <div 
                                            onClick={() => {
                                                setGalleryInitialIndex(0);
                                                setIsGalleryOpen(true);
                                            }}
                                            className="relative w-full max-w-[469px] aspect-[469/289] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800/50 group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 dark:border-gray-800"
                                        >
                                            <Image
                                                src={firstItem.url}
                                                alt="Product preview"
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* Overlay for first item */}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center">
                                                {firstItem.type === "video" ? (
                                                    <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110">
                                                        <Play className="h-6 w-6 text-gray-900 fill-gray-900 ml-1" />
                                                    </div>
                                                ) : (
                                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest border border-white/20">
                                                        Expand Gallery
                                                    </div>
                                                )}
                                                
                                                {galleryItems.length > 1 && (
                                                    <div className="absolute bottom-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                                        <div className="flex -space-x-2">
                                                            {galleryItems.slice(0, 3).map((item, idx) => (
                                                                <div key={idx} className="w-6 h-6 rounded-full border border-white bg-gray-200 overflow-hidden shrink-0">
                                                                    <Image src={item.url} alt="Gallery" width={24} height={24} className="object-cover h-full" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs font-bold text-white">+{galleryItems.length - 1} More</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "comments" && (
                            <div className="text-gray-600 dark:text-gray-400">
                                <p>User comments will appear here.</p>
                            </div>
                        )}
                        {activeTab === "qna" && (
                            <div className="space-y-6">
                                {faqs && faqs.length > 0 ? (
                                    faqs.map((faq) => (
                                        <div key={faq.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{faq.question}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-600 dark:text-gray-400">
                                        <p>No questions and answers yet.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Gallery Modal */}
            <ProductGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                items={galleryItems}
                initialIndex={galleryInitialIndex}
            />
        </div>
    );
}
