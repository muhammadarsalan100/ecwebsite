"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            {/* Thumbnails (Desktop: Vertical Left, Mobile: Hidden/Bottom?) */}
            {/* Standard Layout: Thumbnails Left, Main Right */}
            <div className="hidden md:flex flex-col gap-4 w-24 flex-shrink-0 h-fit items-center">
                <button
                    onClick={handlePrevious}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
                >
                    <ChevronLeft className="w-5 h-5 rotate-90" />
                </button>
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={cn(
                            "relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all",
                            selectedIndex === idx
                                ? "border-black dark:border-white ring-2 ring-offset-2 ring-black dark:ring-white"
                                : "border-transparent hover:border-gray-200"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`Product thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
                >
                    <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
            </div>

            {/* Main Image Area */}
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[600px] w-full flex-grow overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={`Product image ${selectedIndex + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Mobile Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between p-4 md:hidden">
                    <button
                        onClick={handlePrevious}
                        className="rounded-full bg-white/80 p-2 text-black shadow-sm backdrop-blur-sm transition-all hover:bg-white"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="rounded-full bg-white/80 p-2 text-black shadow-sm backdrop-blur-sm transition-all hover:bg-white"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Mobile Dots Indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all shadow-sm",
                                idx === selectedIndex ? "bg-white w-4" : "bg-white/50"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
