import { useState } from "react";

/**
 * A hook that syncs state with localStorage.
 * Works safely in SSR environments — returns the initial value during server-side rendering.
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
