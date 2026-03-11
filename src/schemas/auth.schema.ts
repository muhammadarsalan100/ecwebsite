import { z } from "zod";

export const authSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email field can not be empty" })
        .email({ message: "Please enter a valid email address" }),
});

export type AuthSchema = z.infer<typeof authSchema>;

export const registrationSchema = z.object({
    fullName: z
        .string()
        .min(1, { message: "Name field can not be empty" }),
    email: z
        .string()
        .min(1, { message: "Email field can not be empty" })
        .email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(1, { message: "Password field can not be empty" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
            message: "Password must include at least one uppercase letter, one number, and one special character"
        }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
