import { api, withAuth } from "./apiClient";
import { 
    Category, 
    TopSoldItem, 
    CatalogSearchResponse, 
    CatalogItem 
} from "@/types/product";
import { ApiResponse } from "@/types/auth";

/**
 * Product related API calls.
 */
export const productService = {
    /**
     * Get all categories with subcategories
     */
    getCatalogCategories: () =>
        withAuth(api.get)<ApiResponse<Category[]>>("/api/v1.0/catalog/category"),

    /**
     * Get single category by ID
     */
    getCategoryById: (id: number | string) =>
        withAuth(api.get)<ApiResponse<Category>>(`/api/v1.0/catalog/category/${id}`),

    /**
     * Get category with its attributes
     */
    getCategoryWithAttributes: (id: number | string) =>
        withAuth(api.get)<ApiResponse<Category>>(`/api/v1.0/catalog/category/getWithAttributes/${id}`),

    /**
     * Get top-selling products
     */
    getTopSoldProducts: () =>
        withAuth(api.get)<ApiResponse<TopSoldItem[]>>("/api/v1.0/catalog/item/getTopSold"),

    /**
     * Get a single catalog item by ID
     */
    getCatalogItemById: (id: number | string) =>
        withAuth(api.get)<ApiResponse<CatalogItem>>(`/api/v1.0/catalog/item/${id}`),

    /**
     * Search catalog items by country and category
     */
    searchCatalogItems: (countryCode: string, categoryId: number | string) =>
        withAuth(api.get)<ApiResponse<CatalogSearchResponse>>("/api/v1.0/catalog/item/search", {
            params: {
                countryCode,
                categoryId: String(categoryId)
            }
        }),

    /**
     * Search catalog items by country and search key
     */
    searchCatalogItemsByKey: (countryCode: string, searchKey: string) =>
        withAuth(api.get)<ApiResponse<CatalogSearchResponse>>("/api/v1.0/catalog/item/search", {
            params: {
                countryCode,
                searchKey
            }
        }),

};
