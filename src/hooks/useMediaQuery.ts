import { useState, useEffect } from "react";

/**
 * Returns whether a CSS media query is currently matched.
 * Re-evaluates reactively as the viewport changes.
 *
 * @param query - A valid CSS media query string.
 * @returns `true` if the media query matches, `false` otherwise.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}
