import { useState, useMemo, useCallback } from "react";
import { countriesData } from "@/data/countries";

export function useCountryFilter() {
    const [activeCountryId, setActiveCountryId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const displayedProducts = useMemo(() => {
        if (!activeCountryId) {
            // Default to first country's products if no selection (or all as fallback but user wants to remove all)
            // Actually, if we're making it uniform, we should probably return something.
            // For now, let's just find by ID.
            return countriesData[0]?.products || [];
        }
        return countriesData.find((c) => c.id === activeCountryId)?.products || [];
    }, [activeCountryId]);

    const handleCountrySelect = useCallback((id: string) => {
        setIsLoading(true);
        setActiveCountryId(id);
        // Simulate loading delay for better UX
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return {
        activeCountryId,
        isLoading,
        displayedProducts,
        handleCountrySelect,
    };
}
