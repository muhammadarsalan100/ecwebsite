import { StaticImageData } from "next/image";

export interface CartItem {
    id: string | number;
    title: string;
    price: number;
    image: string | StaticImageData;
    quantity: number;
    color?: string;
    size?: string;
    listingId?: number;
    itemId?: number;
    cartItemId?: number;
    isUpdating?: boolean;
}

export interface BackendCartItem {
    cartId: number;
    itemId: number;
    listingId: number;
    quantity: number;
    currencyId: number;
    unitPrice: number;
    totalPrice: number;
    baseCurrencyId: number;
    unitPriceBaseCurrency: number;
    totalPriceBaseCurrency: number;
    exchangeRate: number;
    attributesJson: string;
    baseCurrencyCode: string;
    currencyCode: string;
    item: {
        name: string;
        description: string;
        slug: string;
        price: number;
        currencyCode: string;
        icon: string;
        id: number;
        images: Array<{ url: string }>;
    };
    id: number;
    createDate: string;
}

export interface BackendCartResponse {
    customerId: number;
    items: BackendCartItem[];
    totalAmount: number;
    totalItems: number;
    id: number;
    code: string;
}
