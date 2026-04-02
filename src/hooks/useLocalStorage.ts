import { useState, useEffect } from "react";

/**
 * A hook that syncs state with localStorage AND listens for cross-tab changes.
 * Works safely in SSR environments — returns the initial value during server-side rendering.
 *
 * Cross-tab sync: when another tab writes to the same localStorage key (e.g. login/logout),
 * the browser fires a native "storage" event. This hook listens for it and updates React
 * state automatically, keeping all open tabs in sync without a page reload.
 *
 * @param key - The localStorage key to read/write.
 * @param initialValue - The initial value if no stored value exists.
 * @returns A stateful value and a setter function that also persists to localStorage.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error(`[useLocalStorage] Failed to read key "${key}":`, error);
            return initialValue;
        }
    });

    // ─── Cross-tab sync ───────────────────────────────────────────────────────
    // The browser fires "storage" events ONLY in OTHER tabs (not the writing tab),
    // so this keeps all other open tabs in sync when one tab logs in, logs out,
    // or has its token refreshed.
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key !== key) return;
            try {
                const newValue = event.newValue
                    ? (JSON.parse(event.newValue) as T)
                    : initialValue;
                setStoredValue(newValue);
            } catch (error) {
                console.error(`[useLocalStorage] Cross-tab sync failed for key "${key}":`, error);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);
    // ─────────────────────────────────────────────────────────────────────────

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`[useLocalStorage] Failed to write key "${key}":`, error);
        }
    };

    return [storedValue, setValue] as const;
}
