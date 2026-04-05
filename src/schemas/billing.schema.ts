import { z } from "zod";

export const billingSchema = z.object({
    firstName: z.string().min(1, { error: "First name is required" }),
    lastName: z.string().min(1, { error: "Last name is required" }),
    streetAddress: z.string().min(1, { error: "Street address is required" }),
    apartment: z.string().optional(),
    city: z.string().min(1, { error: "City is required" }),
    phone: z.string().min(10, { error: "Phone number must be at least 10 digits" }),
    email: z.string().email({ error: "Invalid email address" }),
    saveInfo: z.boolean().default(false),
});

export type BillingSchema = z.infer<typeof billingSchema>;
