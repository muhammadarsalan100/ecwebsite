import { api, withAuth } from "./apiClient";
import { Product, TopSoldItem, CatalogSearchResponse } from "@/types/product";
import { ApiResponse } from "@/types/auth";

/**
 * Product related API calls.
 */
export const productService = {
    /**
     * Get all categories with subcategories
     */
    getCatalogCategories: () =>
        withAuth(api.get)<ApiResponse<any>>("/api/v1.0/catalog/category"),

    /**
     * Get single category by ID
     */
    getCategoryById: (id: number | string) =>
        withAuth(api.get)<ApiResponse<any>>(`/api/v1.0/catalog/category/${id}`),

    /**
     * Get category with its attributes
     */
    getCategoryWithAttributes: (id: number | string) =>
        withAuth(api.get)<ApiResponse<any>>(`/api/v1.0/catalog/category/getWithAttributes/${id}`),

    /**
     * Get top-selling products
     */
    getTopSoldProducts: () =>
        withAuth(api.get)<ApiResponse<TopSoldItem[]>>("/api/v1.0/catalog/item/getTopSold"),

    /**
     * Search catalog items by country and category
     */
    searchCatalogItems: (countryCode: string, categoryId: number | string) =>
        withAuth(api.get)<ApiResponse<CatalogSearchResponse>>("/api/v1.0/catalog/item/search", {
            params: {
                countryCode,
                CategoryId: String(categoryId)
            }
        }),

    /**
     * Public call: Get all products
     */
    getProducts: () => api.get<Product[]>("/products"),

    /**
     * Public call: Get single product
     */
    getProductById: (id: string) => api.get<Product>(`/products/${id}`),

    /**
     * Protected call: Add to wishlist (Associates token via wrapper)
     */
    addToWishlist: (productId: string) =>
        withAuth(api.post)(`/wishlist`, { productId }),

    /**
     * Protected call: Get user wishlist
     */
    getWishlist: () =>
        withAuth(api.get)("/wishlist"),
};
