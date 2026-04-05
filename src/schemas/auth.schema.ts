import { z } from "zod";

export const authSchema = z.object({
    email: z
        .string()
        .min(1, { error: "Email field can not be empty" })
        .email({ error: "Please enter a valid email address" }),
});

export type AuthSchema = z.infer<typeof authSchema>;

export const registrationSchema = z.object({
    fullName: z
        .string()
        .min(2, { error: "Full name must be at least 2 characters" }),
    email: z
        .string()
        .min(1, { error: "Email field can not be empty" })
        .email({ error: "Please enter a valid email address" }),
    password: z
        .string()
        .min(6, { error: "Password must be at least 6 characters" }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const otpSchema = z.object({
    otp: z
        .string()
        .length(4, { error: "Please enter the complete 4-digit code" })
        .regex(/^\d+$/, { error: "OTP must only contain digits" }),
});

export type OtpSchema = z.infer<typeof otpSchema>;
