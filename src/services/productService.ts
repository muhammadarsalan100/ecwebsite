import { api } from "./apiClient";
import {
    Category,
    TopSoldItem,
    CatalogSearchResponse,
    CatalogItem,
    CatalogItemDetail
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
        api.get<ApiResponse<Category[]>>("/api/v1.0/catalog/category"),

    /**
     * Get single category by ID
     */
    getCategoryById: (id: number | string) =>
        api.get<ApiResponse<Category>>(`/api/v1.0/catalog/category/${id}`),

    /**
     * Get category with its attributes
     */
    getCategoryWithAttributes: (id: number | string) =>
        api.get<ApiResponse<Category>>(`/api/v1.0/catalog/category/getWithAttributes/${id}`),

    /**
     * Get top-selling products
     */
    getTopSoldProducts: () =>
        api.get<ApiResponse<TopSoldItem[]>>("/api/v1.0/catalog/item/getTopSold"),

    /**
     * Get a single catalog item by ID
     */
    getCatalogItemById: (id: number | string, currencyCode?: string) =>
        api.get<ApiResponse<CatalogItemDetail>>(`/api/v2.0/catalog/item/${id}`, {
            params: currencyCode ? { currencyCode } : undefined,
        }),

    /**
     * Search catalog items by country and category
     */
    searchCatalogItems: (countryCode: string, categoryId: number | string, currencyCode: string) =>
        api.get<ApiResponse<CatalogSearchResponse>>("/api/v1.0/catalog/item/search", {
            params: {
                countryCode,
                categoryId: String(categoryId),
                currencyCode
            }
        }),

    /**
     * Search catalog items by country and search key
     */
    searchCatalogItemsByKey: (countryCode: string, searchKey: string, currencyCode: string) =>
        api.get<ApiResponse<CatalogSearchResponse>>("/api/v1.0/catalog/item/search", {
            params: {
                countryCode,
                searchKey,
                currencyCode
            }
        }),

};
