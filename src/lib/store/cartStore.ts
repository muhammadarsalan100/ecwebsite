"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types/cart";

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string | number, color?: string, size?: string) => void;
    updateQuantity: (id: string | number, quantity: number, color?: string, size?: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(
                    (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
                );

                if (existingItemIndex > -1) {
                    const updatedItems = [...currentItems];
                    updatedItems[existingItemIndex].quantity += newItem.quantity;
                    set({ items: updatedItems });
                } else {
                    set({ items: [...currentItems, newItem] });
                }
            },

            removeItem: (id, color, size) => {
                set({
                    items: get().items.filter(
                        (item) => !(item.id === id && item.color === color && item.size === size)
                    ),
                });
            },

            updateQuantity: (id, quantity, color, size) => {
                if (quantity <= 0) {
                    get().removeItem(id, color, size);
                    return;
                }

                set({
                    items: get().items.map((item) =>
                        (item.id === id && item.color === color && item.size === size)
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Helper selectors
export const useCartTotal = () => {
    const items = useCartStore((state) => state.items);
    return items.reduce((total, item) => total + item.quantity, 0);
};

export const useCartSubtotal = () => {
    const items = useCartStore((state) => state.items);
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
