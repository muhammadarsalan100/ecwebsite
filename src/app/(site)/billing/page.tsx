"use client";

import { CategoryNavBar } from "@/components/home/CategoryNavBar";
import { BillingForm } from "@/components/billing/BillingForm";
import { OrderSummary } from "@/components/billing/OrderSummary";

export default function BillingPage() {
    return (
        <>
            <CategoryNavBar />
            <div className="w-full px-4 py-10 md:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">

                    <h1
                        className="text-3xl md:text-4xl font-semibold text-black mb-10"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Billing Details
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
                        {/* Left Column: Billing Form */}
                        <BillingForm />

                        {/* Right Column: Order Summary */}
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </>
    );
}
