import { api } from "./apiClient";
import { API_ROUTES } from "@/constants";
import { ApiResponse } from "@/types/auth";
import { BackendCartResponse } from "@/types/cart";

/**
 * Service to handle Cart-related API calls.
 */
export const cartService = {
    /**
     * Fetch current cart for the authenticated user or guest.
     */
    getCart: () => 
        api.get<ApiResponse<BackendCartResponse>>(API_ROUTES.CART),

    /**
     * Add an item to the cart.
     */
    addItem: (data: { listingId: number; itemId: number; quantity: number; attributes?: any[] }) =>
        api.post<ApiResponse<BackendCartResponse>>(API_ROUTES.CART_ITEMS, { data }),

    /**
     * Update an item's quantity in the cart.
     */
    updateItem: (cartItemId: number, quantity: number) =>
        api.patch<ApiResponse<BackendCartResponse>>(API_ROUTES.CART_ITEMS, { 
            data: { cartItemId, quantity } 
        }),

    /**
     * Remove an item from the cart.
     */
    removeItem: (cartItemId: number) =>
        api.delete<ApiResponse<null>>(`${API_ROUTES.CART_ITEMS}/${cartItemId}`),
};
