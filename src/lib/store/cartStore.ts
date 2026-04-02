"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { STORAGE_KEYS } from "@/constants";

interface CartState {
    items: CartItem[];
    isLoading: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string | number, color?: string, size?: string) => Promise<void>;
    updateQuantity: (id: string | number, quantity: number, color?: string, size?: string) => Promise<void>;
    clearCart: () => void;
}

const transformBackendItem = (item: any): CartItem => ({
    id: item.id, // Current entry ID (important for updates/removes)
    title: item.item.name,
    price: item.unitPrice,
    image: item.item.icon || (item.item.images?.[0]?.url) || "/images/placeholder.png",
    quantity: item.quantity,
    listingId: item.listingId,
    itemId: item.itemId,
    cartItemId: item.id,
});

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,
            error: null,

            fetchCart: async () => {
                const { cartService } = await import("@/services/cartService");
                set({ isLoading: true, error: null });
                try {
                    const response = await cartService.getCart();
                    const items = (response.data?.items || []).map(transformBackendItem);
                    set({ items, isLoading: false });
                } catch (err: any) {
                    console.error("[CART] Fetch Error:", err);
                    set({ error: err.message || "Failed to fetch cart", isLoading: false });
                }
            },

            addItem: async (newItem) => {
                const { cartService } = await import("@/services/cartService");
                set({ isLoading: true, error: null });
                try {
                    // Map attributes if present
                    const attributes = [];
                    if (newItem.color) attributes.push({ name: "Color", value: { name: newItem.color } });
                    if (newItem.size) attributes.push({ name: "Size", value: { name: newItem.size } });

                    const response = await cartService.addItem({
                        listingId: Number(newItem.listingId),
                        itemId: Number(newItem.itemId),
                        quantity: newItem.quantity,
                        attributes: attributes.length > 0 ? attributes : undefined
                    });

                    const items = (response.data?.items || []).map(transformBackendItem);
                    set({ items, isLoading: false });
                } catch (err: any) {
                    console.error("[CART] Add Error:", err);
                    set({ error: err.message || "Failed to add item to cart", isLoading: false });
                    // Fallback to local logic if needed? 
                    // No, user wants backend-synced cart.
                }
            },

            removeItem: async (id, color, size) => {
                const { cartService } = await import("@/services/cartService");

                // Optimistic UI update: Filter locally first
                const previousItems = get().items;
                set({
                    items: previousItems.filter(
                        (item) => !(item.id === id && item.color === color && item.size === size)
                    ),
                    isLoading: true,
                    error: null
                });

                try {
                    const response = await cartService.removeItem(Number(id));
                    if (response.code === "OK") {
                        set({ isLoading: false });
                    } else {
                        // If backend error, optionally revert?
                        // For now we'll just log and continue
                        set({ isLoading: false });
                    }
                } catch (err: any) {
                    console.error("[CART] Remove Error:", err);
                    set({
                        items: previousItems, // Revert on error
                        error: err.message || "Failed to remove item",
                        isLoading: false
                    });
                }
            },

            updateQuantity: async (id, quantity, color, size) => {
                const { cartService } = await import("@/services/cartService");
                
                if (quantity <= 0) {
                    await get().removeItem(id, color, size);
                    return;
                }

                // Optimistic UI update
                const previousItems = get().items;
                const newItems = previousItems.map(item => 
                    (item.id === id && item.color === color && item.size === size)
                        ? { ...item, quantity, isUpdating: true } // Update quantity and set loading
                        : item
                );
                
                set({ items: newItems, error: null });

                try {
                    // Our 'id' is the cartItemId
                    const response = await cartService.updateItem(Number(id), quantity);
                    
                    // After success, sync with backend (may include final quantities/prices)
                    const backendItems = (response.data?.items || []).map(item => ({
                        ...transformBackendItem(item),
                        isUpdating: false
                    }));
                    
                    set({ items: backendItems, isLoading: false });
                } catch (err: any) {
                    console.error("[CART] Update Error:", err);
                    // Revert on error
                    set({ 
                        items: previousItems, 
                        error: err.message || "Failed to update item", 
                        isLoading: false 
                    });
                }
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: STORAGE_KEYS.CART,
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
