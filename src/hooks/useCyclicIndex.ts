import { useState, useCallback } from "react";

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
