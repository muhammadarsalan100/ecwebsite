import { StaticImageData } from "next/image";

export interface CartItem {
    id: string | number;
    title: string;
    price: number;
    image: string | StaticImageData;
    quantity: number;
    color?: string;
    size?: string;
}

export interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
}
