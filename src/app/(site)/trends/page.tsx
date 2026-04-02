"use client";

import { VendorStoreList } from "@/components/vendor/VendorStoreList";
import { CategoryNavBar } from "@/components/common/CategoryNavBar";

export default function TrendsPage() {
    return (
        <div className="min-h-screen bg-[#FBFCFD] dark:bg-gray-950">
            <CategoryNavBar />
            <VendorStoreList />
        </div>
    );
}
