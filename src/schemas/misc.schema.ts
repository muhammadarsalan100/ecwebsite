import { z } from "zod";

export const newsletterSchema = z.object({
    email: z
        .string()
        .min(1, { error: "Email is required" })
        .email({ error: "Invalid email address" }),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
