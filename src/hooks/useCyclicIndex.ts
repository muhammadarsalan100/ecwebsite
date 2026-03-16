import { useState, useCallback } from "react";

/**
 * Manages a cyclically incrementing/decrementing index within a fixed-length array.
 * Wraps around at both ends — useful for carousels, slideshows, and image galleries.
 *
 * @param length - The total number of items (upper bound, exclusive).
 * @param initialIndex - Starting index (defaults to 0).
 *
 * @example
 * const { index, next, prev } = useCyclicIndex(images.length);
 */
export function useCyclicIndex(length: number, initialIndex: number = 0) {
    const [index, setIndex] = useState(initialIndex);

    const next = useCallback(() => {
        setIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, [length]);

    const prev = useCallback(() => {
        setIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
    }, [length]);

    const setIndexSafe = useCallback((newIndex: number) => {
        if (newIndex >= 0 && newIndex < length) {
            setIndex(newIndex);
        }
    }, [length]);

    return {
        index,
        next,
        prev,
        setIndex: setIndexSafe,
    };
}
