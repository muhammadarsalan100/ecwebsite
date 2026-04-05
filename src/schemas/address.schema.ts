import { z } from "zod";

export const addressSchema = z.object({
    countryId: z.union([z.string(), z.number()])
        .refine((v) => v !== "" && Number(v) > 0, { error: "Please select a country" }),

    stateId: z.union([z.string(), z.number()])
        .refine((v) => v !== "" && Number(v) > 0, { error: "Please select a state" }),

    cityId: z.union([z.string(), z.number()])
        .refine((v) => v !== "" && Number(v) > 0, { error: "Please select a city" }),

    addressLine1: z
        .string()
        .min(1, { error: "Street address is required" }),

    mobileNumber: z
        .string()
        .min(1, { error: "Mobile number is required" }),

    label: z
        .string()
        .min(1, { error: "Label is required (e.g. Home, Office)" }),
});

export type AddressSchema = z.infer<typeof addressSchema>;
