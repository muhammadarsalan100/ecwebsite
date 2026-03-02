import { z } from "zod";

export const billingSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    streetAddress: z.string().min(1, { message: "Street address is required" }),
    apartment: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    email: z.string().email({ message: "Invalid email address" }),
    saveInfo: z.boolean().default(false),
});

export type BillingSchema = z.infer<typeof billingSchema>;
