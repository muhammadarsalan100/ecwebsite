"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "@/services/authService";
import { productService } from "@/services/productService";
import { Category } from "@/types/product";

export interface Country {
    id: number;
    name: string;
    shortCode: string;
    language: string;
    flagUrl: string;
    currency: {
        name: string;
        shortCode: string;
        symbolUrl: string;
    };
    code: string;
}
export interface State {
    id: number;
    name: string;
    shortCode: string;
    countryId: number;
    code: string;
    active: boolean;
    createDate?: string;
    modifiedDate?: string | null;
}

export interface City {
    id: number;
    name: string;
    shortCode: string;
    stateId: number;
    code: string;
    active: boolean;
    createDate?: string;
    modifiedDate?: string | null;
}

export interface Currency {
    id: number;
    name: string;
    shortCode: string;
    symbolUrl: string | null;
    code: string;
}

interface ConfigState {
    activeCategoryId: string | null;
    countries: Country[];
    states: State[];
    cities: City[];
    currencies: any[]; // List of country-currency mapping objects
    selectedCountry: Country | null;
    selectedState: State | null;
    selectedCity: City | null;
    selectedLanguage: string;
    selectedCurrency: string;
    isLoading: boolean;
    isStatesLoading: boolean;
    isCitiesLoading: boolean;
    isCurrenciesLoading: boolean;
    isCategoriesLoading: boolean;
    isCategoryDetailLoading: boolean;
    isCategoryAttributesLoading: boolean;
    isItemsLoading: boolean;
    error: string | null;

    fetchCountries: () => Promise<void>;
    fetchStates: (countryId: number | string) => Promise<void>;
    fetchCities: (stateId: number | string) => Promise<void>;
    fetchCountryCurrencies: (countryId: number | string) => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchCategoryById: (id: number | string) => Promise<void>;
    fetchCategoryWithAttributes: (id: number | string) => Promise<void>;
    fetchCatalogItems: (countryCode: string, categoryId: number | string) => Promise<void>;
    categories: Category[];
    items: any[];
    totalItems: number;
    selectedCategory: Category | null;
    setSelectedCountry: (country: Country) => void;
    setSelectedState: (state: State) => void;
    setSelectedCity: (city: City) => void;
    setSelectedLanguage: (language: string) => void;
    setSelectedCurrency: (currency: string) => void;
    setActiveCategoryId: (id: string | null) => void;
    resetConfig: () => void;
}

export const useConfigStore = create<ConfigState>()(
    persist(
        (set) => ({
            activeCategoryId: null,
            countries: [],
            states: [],
            cities: [],
            currencies: [],
            selectedCountry: null,
            selectedState: null,
            selectedCity: null,
            selectedLanguage: "",
            selectedCurrency: "",
            isLoading: false,
            isStatesLoading: false,
            isCitiesLoading: false,
            isCurrenciesLoading: false,
            isCategoriesLoading: false,
            isCategoryDetailLoading: false,
            isCategoryAttributesLoading: false,
            isItemsLoading: false,
            error: null,
            categories: [],
            items: [],
            totalItems: 0,
            selectedCategory: null,

            fetchCountries: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.getCountries();
                    if (response && response.data) {
                        set({ countries: response.data, isLoading: false });
                    } else {
                        set({ error: "Failed to fetch countries", isLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isLoading: false });
                }
            },

            fetchStates: async (countryId: number | string) => {
                set({ isStatesLoading: true, error: null });
                try {
                    const response = await authService.getStates(countryId);
                    if (response && response.data) {
                        set({ states: response.data, isStatesLoading: false });
                    } else {
                        set({ error: "Failed to fetch states", isStatesLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isStatesLoading: false });
                }
            },

            fetchCities: async (stateId: number | string) => {
                set({ isCitiesLoading: true, error: null });
                try {
                    const response = await authService.getCities(stateId);
                    if (response && response.data) {
                        set({ cities: response.data, isCitiesLoading: false });
                    } else {
                        set({ error: "Failed to fetch cities", isCitiesLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isCitiesLoading: false });
                }
            },

            fetchCountryCurrencies: async (countryId: number | string) => {
                set({ isCurrenciesLoading: true, error: null });
                try {
                    const response = await authService.getCountryCurrencies(countryId);
                    if (response && response.data) {
                        set({ currencies: response.data, isCurrenciesLoading: false });
                    } else {
                        set({ error: "Failed to fetch currencies", isCurrenciesLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isCurrenciesLoading: false });
                }
            },

            fetchCategories: async () => {
                set({ isCategoriesLoading: true, error: null });
                try {
                    const response = await productService.getCatalogCategories();
                    if (response && response.data) {
                        set({ categories: response.data, isCategoriesLoading: false });
                    } else {
                        set({ error: "Failed to fetch categories", isCategoriesLoading: false });
                    }
                } catch (err: any) {
                    console.error("Fetch categories error:", err);
                    set({ error: err.message || "An error occurred", isCategoriesLoading: false });
                }
            },

            fetchCategoryById: async (id: number | string) => {
                set({ isCategoryDetailLoading: true, error: null });
                try {
                    const response = await productService.getCategoryById(id);
                    if (response && response.data) {
                        set({ selectedCategory: response.data, isCategoryDetailLoading: false });
                    } else {
                        set({ error: "Failed to fetch category detail", isCategoryDetailLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isCategoryDetailLoading: false });
                }
            },

            fetchCategoryWithAttributes: async (id: number | string) => {
                set({ isCategoryAttributesLoading: true, error: null });
                try {
                    const response = await productService.getCategoryWithAttributes(id);
                    if (response && response.data) {
                        set({ selectedCategory: response.data, isCategoryAttributesLoading: false });
                    } else {
                        set({ error: "Failed to fetch category attributes", isCategoryAttributesLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isCategoryAttributesLoading: false });
                }
            },

            fetchCatalogItems: async (countryCode: string, categoryId: number | string) => {
                set({ isItemsLoading: true, error: null });
                try {
                    const response = await productService.searchCatalogItems(countryCode, categoryId);
                    if (response && response.data) {
                        set({
                            items: response.data.items,
                            totalItems: response.data.totalCount,
                            isItemsLoading: false
                        });
                    } else {
                        set({ error: "Failed to fetch items", isItemsLoading: false });
                    }
                } catch (err: any) {
                    set({ error: err.message || "An error occurred", isItemsLoading: false });
                }
            },

            setSelectedCountry: (country: Country) => {
                set({
                    selectedCountry: country,
                    states: [],
                    cities: [],
                    currencies: [],
                    selectedState: null,
                    selectedCity: null,
                    selectedLanguage: country?.language === 'en' ? 'English' : (country?.language || 'English'),
                    selectedCurrency: country?.currency
                        ? `${country.currency.shortCode} - ${country.currency.name}`
                        : "USD - US Dollar",
                });
            },

            setSelectedState: (state: State) => {
                set({
                    selectedState: state,
                    cities: [],
                    selectedCity: null,
                });
            },

            setSelectedCity: (city: City) => set({ selectedCity: city }),

            setSelectedLanguage: (language: string) => set({ selectedLanguage: language }),
            setSelectedCurrency: (currency: string) => set({ selectedCurrency: currency }),
            setActiveCategoryId: (id: string | null) => set({ activeCategoryId: id }),
            resetConfig: () => {
                set({
                    countries: [],
                    states: [],
                    cities: [],
                    currencies: [],
                    selectedCountry: null,
                    selectedState: null,
                    selectedCity: null,
                    selectedLanguage: "",
                    selectedCurrency: "",
                    categories: [],
                    selectedCategory: null,
                    activeCategoryId: null,
                    error: null
                });
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("config-storage");
                }
            },
        }),
        {
            name: "config-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
