"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: { type: "image" | "video"; url: string; title?: string; duration?: string; thumbnailUrl?: string }[];
    initialIndex?: number;
}

export function ProductGalleryModal({ isOpen, onClose, items, initialIndex = 0 }: ProductGalleryModalProps) {
    const [activeType, setActiveType] = useState<"image" | "video">("image");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredItems = items.filter(item => item.type === activeType);

    useEffect(() => {
        if (isOpen) {
            const initialItem = items[initialIndex];
            if (initialItem) {
                setActiveType(initialItem.type);
                const filteredIndex = items
                    .filter(item => item.type === initialItem.type)
                    .findIndex(item => item.url === initialItem.url);
                setSelectedIndex(filteredIndex >= 0 ? filteredIndex : 0);
            }
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen, initialIndex, items]);

    const handlePrevious = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    };

    if (!isOpen) return null;

    const currentItem = filteredItems[selectedIndex];
    const hasVideos = items.some(item => item.type === "video");

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={onClose}
        >
            <div 
                className="relative bg-white dark:bg-gray-900 w-[90%] max-w-2xl rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Tabs */}
                <div className="flex flex-col sm:flex-row justify-center items-center pt-12 sm:pt-8 pb-2 relative">
                    <div className="flex gap-6 sm:gap-10">
                        <button
                            onClick={() => {
                                setActiveType("image");
                                setSelectedIndex(0);
                            }}
                            className={cn(
                                "pb-2 text-xl font-bold transition-all relative px-2",
                                activeType === "image" 
                                    ? "text-[#0092FF]" 
                                    : "text-gray-300 hover:text-gray-400"
                            )}
                        >
                            Images
                            {activeType === "image" && (
                                <motion.div 
                                    layoutId="modalTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#0092FF] rounded-full"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setActiveType("video");
                                setSelectedIndex(0);
                            }}
                            className={cn(
                                "pb-2 text-xl font-bold transition-all relative px-2",
                                activeType === "video" 
                                    ? "text-[#0092FF]" 
                                    : "text-gray-300 hover:text-gray-400"
                            )}
                        >
                            Videos
                            {activeType === "video" && (
                                <motion.div 
                                    layoutId="modalTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#0092FF] rounded-full"
                                />
                            )}
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex items-center justify-center p-6 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeType}-${selectedIndex}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-xl h-[320px] flex items-center justify-center"
                        >
                            {currentItem?.type === "image" ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={currentItem.url}
                                        alt="Product view"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            ) : currentItem?.type === "video" ? (
                                <div className="relative w-full h-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-800">
                                    <Image
                                        src={currentItem.thumbnailUrl || currentItem.url}
                                        alt="Video preview"
                                        fill
                                        className="object-contain opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-black/5" />
                                    <button className="relative z-10 w-20 h-20 bg-[#0092FF] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group">
                                        <Play className="w-8 h-8 text-white fill-white ml-1.5 transition-transform group-hover:scale-110" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 w-full h-full">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <Play className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">No Videos Available</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[250px]">
                                        There are currently no videos showcasing this product.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Thumbnails row */}
                {filteredItems.length > 0 && (
                    <div className="p-4 sm:p-8 pt-0 flex items-center justify-center gap-2 sm:gap-4">
                    {filteredItems.length > 1 && (
                        <button
                            onClick={handlePrevious}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 transition-all flex-shrink-0 shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    )}

                    <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none max-w-[85%]">
                        {filteredItems.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedIndex(idx)}
                                className={cn(
                                    "relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all p-1 bg-gray-50 dark:bg-gray-800/50 group",
                                    selectedIndex === idx 
                                        ? "border-[#0092FF] scale-105 shadow-md shadow-blue-500/10" 
                                        : "border-gray-100 dark:border-gray-800 hover:border-gray-200"
                                )}
                            >
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                    <Image
                                        src={item.thumbnailUrl || item.url}
                                        alt={`Thumb ${idx}`}
                                        fill
                                        className="object-contain p-0.5"
                                    />
                                </div>
                                {item.type === "video" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                                        <Play className="w-4 h-4 text-white fill-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {filteredItems.length > 1 && (
                        <button
                            onClick={handleNext}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 transition-all flex-shrink-0 shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    )}
                </div>
                )}
            </div>
        </div>
    );
}
