import { StaticImageData } from "next/image";

// ─── UI Display Types ──────────────────────────────────────────────────────────

export interface Product {
    id: string;
    listingId: number | string;
    itemId: number | string;
    name: string;
    brand?: string;
    image: string | StaticImageData;
    price: number;
    rating: number;
    reviews: string | number;
    originalPrice?: number;
    currencyCode?: string;
    stockMessage?: string;
    isPromotionApplied?: boolean;
    soldOut?: boolean;
}

export interface FeaturedProductCard {
    id: string;
    image: string | StaticImageData;
    title: string;
    subtitle?: string;
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

// ─── Component Props ───────────────────────────────────────────────────────────

export interface ProductInfoProps {
    id: string | number;
    listingId?: number | string;
    itemId?: number | string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    currencyCode?: string;
    rating: number;
    reviewsCount: number;
    description: string;
    colors: ProductColor[];
    sizes: string[];
    category: string;
    subcategory: string;
}

export interface ProductGalleryProps {
    images: string[];
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
    shortDescription: string;
    longDescription?: string;
    reviewsCount?: number;
    faqs?: FAQ[];
    technicalAttributes?: any[];
    videos?: any[];
    images?: string[];
}

// ─── Category & Attribute API Types ──────────────────────────────────────────

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

// ─── Catalog API Types ─────────────────────────────────────────────────────────

export interface CatalogItemImage {
    url: string;
    id: number | string;
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
    vendor: {
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
    };
    id: number;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

// ─── V2.0 Catalog Item Detail Types ───────────────────────────────────────────

export interface PriceInfo {
    currency: string;
    mrp: number;
    price: number;
}

export interface RatingInfo {
    rating: number;
    totalReviews: number;
    breakdown: any;
}

export interface BrandInfo {
    name: string;
    description: string;
    logoUrl: string | null;
    id: number;
    code: string;
    active: boolean;
    createDate: string;
    modifiedDate: string | null;
}

export interface CatalogItemDetail {
    sku: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    condition: number;
    tags: string[] | null;
    keySellingPoints: any[];
    minimumOrderQty: number;
    maximumOrderQty: number;
    simpleAttributes: any[];
    technicalAttributes: any[];
    hsCode: string | null;
    isDangerousItem: boolean;
    countryOfOrigin: string | null;
    faqs: FAQ[];
    brand: BrandInfo;
    category: Category;
    price: PriceInfo;
    warranty: {
        warrantyType: number;
        warrantyDuration: string | null;
    };
    returnPolicy: {
        isReturnable: boolean;
        returnWindowDays: number;
        returnTermAndConditions: string | null;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        tags: string[] | null;
    };
    seller: any;
    logo: string;
    images: string[];
    videos: any[];
    rating: RatingInfo;
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

// ─── Top Vendors API Types ────────────────────────────────────────────────────

export interface TopVendorProduct {
    itemId: number;
    itemName: string;
    logo: string;
    unitsSold: number;
    totalSale: number;
    listingId: number;
    currentPrice: number;
    categoryId: number;
    categoryName: string;
}

export interface TopVendor {
    vendorId: number;
    storeId: number;
    storeName: string;
    vendorName: string;
    totalUnitsSold: number;
    totalSale: number;
    followersCount: number;
    isFollowed: boolean;
    topProducts: TopVendorProduct[];
}

export interface TopVendorsResponse {
    items: TopVendor[];
    nextCursor: {
        lastStoreId: number;
        lastVendorId: number;
        lastTotalUnitsSold: number;
        lastTotalSale: number;
    } | null;
}
