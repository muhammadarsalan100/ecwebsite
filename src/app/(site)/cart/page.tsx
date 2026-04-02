"use client";

import { useCartStore, useCartSubtotal } from "@/lib/store/cartStore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { productService } from "@/services/productService";
import { useConfigStore } from "@/lib/store/configStore";

// Sub-components
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { AddressSelector } from "@/components/cart/AddressSelector";
import { PaymentDetails } from "@/components/cart/PaymentDetails";
import { RelatedProducts } from "@/components/cart/RelatedProducts";
import { AddressModal } from "@/components/cart/AddressModal";

function CartPage() {
    const { items, removeItem, updateQuantity, isLoading: isCartLoading } = useCartStore();
    const subtotal = useCartSubtotal();

    const selectedCurrency = useConfigStore((state) => state.selectedCurrency) || "USD";
    const currencySymbol = selectedCurrency.includes("USD") ? "$" : "";

    // Dynamic state for fetching
    const [profile, setProfile] = useState<any>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // Hardcoded to 0 as per user request if not available via API
    const discount = 0;
    const shipmentCost = 0;
    const total = subtotal - discount + shipmentCost;

    const { selectedCountry } = useConfigStore();

    const fetchProfile = async () => {
        setIsLoadingProfile(true);
        try {
            const profileRes = await authService.getAccount();
            if (profileRes?.data) {
                setProfile(profileRes.data);
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
        } finally {
            setIsLoadingProfile(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Profile
                await fetchProfile();
                
                // 2. Fetch "Also Viewed" (Related) items
                // Only proceed if we have basic requirements, or use safe defaults
                const categoriesRes = await productService.getCatalogCategories().catch(err => {
                    console.error("[CART] Categories fetch failed:", err);
                    return null;
                });

                if (categoriesRes?.data && categoriesRes.data.length > 0) {
                    const firstCat = categoriesRes.data[0];
                    // Defensive coding for parameters
                    const countryCode = selectedCountry?.shortCode || "UAE";
                    const currencyCode = selectedCountry?.currency?.shortCode || "AED";
                    
                    const itemsRes = await productService.searchCatalogItems(countryCode, firstCat.id, currencyCode).catch(err => {
                        console.error("[CART] Related items fetch failed:", err);
                        return null;
                    });

                    if (itemsRes?.data?.items) {
                        setRelatedProducts(itemsRes.data.items.slice(0, 4));
                    }
                }
            } catch (error) {
                console.error("Cart data fetch overall error:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        fetchData();
    }, [selectedCountry, profile?.preferredCountryId]);

    const handleAddressSuccess = () => {
        fetchProfile();
    };

    // Derived addresses from profile
    const userAddresses = profile?.business?.addressLine1 ? [
        {
            id: 1,
            city: profile.business.city || "Primary Location",
            address: profile.business.addressLine1 + (profile.business.zipCode ? `, ${profile.business.zipCode}` : ""),
            isDefault: true
        }
    ] : [];

    if (items.length === 0) {
        if (isCartLoading) {
            return (
                <div className="bg-[#FBFCFD] min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0092FF]"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Loading your cart...</p>
                    </div>
                </div>
            )
        }
        return <EmptyCart />;
    }

    return (
        <div className="bg-[#FBFCFD] min-h-screen">
            <CategoryNavBar />

            <div className="max-w-[1400px] mx-auto px-4 py-8 md:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Cart Items */}
                    <div className="flex-1 space-y-4">
                        {items.map((item) => (
                            <CartItemCard
                                key={`${item.id}-${item.color}-${item.size}`}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                                currencySymbol={currencySymbol}
                            />
                        ))}
                    </div>

                    {/* Right Column: Address and Summary */}
                    <div className="w-full lg:w-[400px] space-y-6">
                        <AddressSelector
                            isLoading={isLoadingProfile}
                            addresses={userAddresses}
                            selectedAddress={selectedAddress}
                            onSelectAddress={setSelectedAddress}
                            onAddNew={() => setIsAddressModalOpen(true)}
                        />

                        <PaymentDetails
                            subtotal={subtotal}
                            discount={discount}
                            shipmentCost={shipmentCost}
                            total={total}
                            currencySymbol={currencySymbol}
                        />
                    </div>
                </div>

                <RelatedProducts
                    isLoading={isLoadingProducts}
                    products={relatedProducts}
                />
            </div>

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSuccess={handleAddressSuccess}
                initialData={profile}
            />
        </div>
    );
}

export default function ProtectedCartPage() {
    return (
        <ProtectedRoute>
            <CartPage />
        </ProtectedRoute>
    );
}
