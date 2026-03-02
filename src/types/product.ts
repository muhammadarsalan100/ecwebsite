import { StaticImageData } from "next/image";

export interface Product {
    id: string;
    name: string;
    brand?: string;
    image: string | StaticImageData;
    price: number;
    rating: number;
    reviews: string | number;
    almostSoldOut?: boolean;
    soldOut?: boolean;
}

export interface FeaturedProductCard {
    id: string;
    image: string | StaticImageData;
    title: string;
    subtitle?: string;
}

export interface CategoryImage {
    url: string;
    id: number | string;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface Attribute {
    value: string;
    id: number | string;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface AttributeDefinition {
    name: string;
    key: string;
    dataType: string;
    isRequired: boolean;
    isFilterable: boolean;
    isVariantLevel: boolean;
    sortOrder: number;
    isSelf: boolean;
    attributes: Attribute[];
    id: number | string;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface Category {
    id: number | string;
    image?: string;
    name: string;
    slug: string;
    parentId: number | string | null;
    displayOrder: number;
    icon: string | null;
    images: CategoryImage[];
    subCategories: Category[];
    attributeDefinitions: AttributeDefinition[];
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface ProductItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

export interface ProductColor {
    name: string;
    value: string;
}

export interface ProductInfoProps {
    title: string;
    price: number;
    rating: number;
    reviewsCount: number;
    description: string;
    colors: ProductColor[];
    sizes: string[];
    category: string;
    subcategory: string;
}

export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface ProductTabsProps {
    description: string;
    reviews?: Review[];
    faqs?: FAQ[];
}

export interface ProductGalleryProps {
    images: string[];
}

export interface TopSoldItem {
    vendorId: number;
    itemId: number;
    totalSale: number;
    item: {
        itemId: number;
        itemName: string;
        icon: string;
    };
}

export interface CatalogItemImage {
    url: string;
    id: number | string;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface Vendor {
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    dob: string | null;
    gender: string;
    phoneNo: string | null;
    lastLoginAt: string | null;
    approvedDate: string | null;
    id: number;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface CatalogItem {
    listingId: number;
    isPromotionApplied: boolean;
    originalPrice: number;
    name: string;
    description: string;
    slug: string;
    price: number;
    currencyCode: string;
    displayOrder: number;
    icon: string | null;
    isVariantSupported: boolean;
    categoryId: number;
    vendorId: number;
    manageStock: boolean;
    minimumStockThreshhold: number;
    rating: number;
    images: CatalogItemImage[];
    category: Category;
    vendor: Vendor;
    id: number;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface CatalogSearchResponse {
    items: CatalogItem[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}
