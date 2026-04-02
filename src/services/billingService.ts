import { api } from "./apiClient";
import { BillingSchema } from "@/schemas/billing.schema";

/**
 * Checkout and Billing API calls.
 */
export const billingService = {
    /**
     * Process order (Requires Auth)
     */
    createOrder: (data: BillingSchema) =>
        api.post("/api/v1.0/orders", data),

    /**
     * Get order history (Requires Auth)
     */
    getOrderHistory: () =>
        api.get("/api/v1.0/orders/history"),

    /**
     * Get specific order details (Requires Auth)
     */
    getOrderDetails: (orderId: string) =>
        api.get(`/api/v1.0/orders/${orderId}`),
};
