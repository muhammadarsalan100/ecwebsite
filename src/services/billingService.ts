import { api, withAuth } from "./apiClient";
import { BillingSchema } from "@/schemas/billing.schema";

/**
 * Checkout and Billing API calls.
 */
export const billingService = {
    /**
     * Process order (Requires Auth)
     */
    createOrder: (data: BillingSchema) =>
        withAuth(api.post)("/orders", data),

    /**
     * Get order history
     */
    getOrderHistory: () =>
        withAuth(api.get)("/orders/history"),

    /**
     * Get specific order details
     */
    getOrderDetails: (orderId: string) =>
        withAuth(api.get)(`/orders/${orderId}`),
};
