import { useState, useEffect, useCallback } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    setScrollSnaps(api.scrollSnapList());
    
    api.on("select", () => onSelect(api));
    api.on("reInit", () => {
        onSelect(api);
        setScrollSnaps(api.scrollSnapList());
    });

    return () => {
      api.off("select", () => onSelect(api));
    };
  }, [api, onSelect]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return {
    setApi,
    api,
    canScrollPrev,
    canScrollNext,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
