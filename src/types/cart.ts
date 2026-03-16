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
