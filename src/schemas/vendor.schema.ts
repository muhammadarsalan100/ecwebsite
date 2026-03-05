import { z } from "zod";

// Phone regex for international format (allows +, spaces, dashes, parentheses)
const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;

export const vendorStep1Schema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().regex(phoneRegex, "Please enter a valid phone number (including country code)"),
    streetAddress: z.string().min(5, "Please enter a complete street address"),
});

export const vendorStep2Schema = z.object({
    bankName: z.string().min(1, "Bank name is required"),
    accountTitle: z.string().min(2, "Account title must be at least 2 characters"),
    accountNumber: z.string().regex(/^\d{10,20}$/, "Account number must be 10–20 digits"),
    branchCode: z.string().min(1, "Branch code is required"),
    iban: z.string().min(15, "Please enter a valid IBAN"),
    bankStatementFile: z.any().optional(), // File validation handled in component for better UX
});

export const vendorStep3Schema = z.object({
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().regex(/^[a-zA-Z0-9\s-]{3,10}$/, "Invalid ZIP / Postal code"),
    state: z.string().min(1, "State / Region is required"),
    city: z.string().min(1, "City / Town is required"),
    addressLine1: z.string().min(5, "Please enter a complete address"),
    addressLine2: z.string().optional(),
});

export const vendorStep4Schema = z.object({
    passportNumber: z.string().min(1, "Passport number is required"),
    passportIssueDate: z.string().min(1, "Issue date is required"),
    passportExpiryDate: z.string().min(1, "Expiry date is required"),
    passportImage: z.any().refine((file) => file !== null, "Passport image is required"),
    idCardNumber: z.string().min(1, "ID number is required"),
    idCardIssueDate: z.string().min(1, "Issue date is required"),
    idCardExpiryDate: z.string().min(1, "Expiry date is required"),
    idCardFrontImage: z.any().refine((file) => file !== null, "Front image is required"),
    idCardBackImage: z.any().refine((file) => file !== null, "Back image is required"),
}).refine((data) => {
    if (data.passportIssueDate && data.passportExpiryDate) {
        return new Date(data.passportExpiryDate) > new Date(data.passportIssueDate);
    }
    return true;
}, {
    message: "Expiry date must be after issue date",
    path: ["passportExpiryDate"],
}).refine((data) => {
    if (data.idCardIssueDate && data.idCardExpiryDate) {
        return new Date(data.idCardExpiryDate) > new Date(data.idCardIssueDate);
    }
    return true;
}, {
    message: "Expiry date must be after issue date",
    path: ["idCardExpiryDate"],
});

export type VendorStep1Schema = z.infer<typeof vendorStep1Schema>;
export type VendorStep2Schema = z.infer<typeof vendorStep2Schema>;
export type VendorStep3Schema = z.infer<typeof vendorStep3Schema>;
export type VendorStep4Schema = z.infer<typeof vendorStep4Schema>;
