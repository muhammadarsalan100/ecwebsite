/**
 * Barrel export for all Zod validation schemas.
 * Import schemas from here:
 *   import { authSchema, billingSchema } from "@/schemas";
 */

export { authSchema, registrationSchema } from "./auth.schema";
export type { AuthSchema, RegistrationSchema } from "./auth.schema";

export { billingSchema } from "./billing.schema";
export type { BillingSchema } from "./billing.schema";

export { newsletterSchema } from "./misc.schema";
export type { NewsletterSchema } from "./misc.schema";

export { addressSchema } from "./address.schema";
export type { AddressSchema } from "./address.schema";

export {
    vendorStep1Schema,
    vendorStep2Schema,
    vendorStep3Schema,
    vendorStep4Schema,
} from "./vendor.schema";
export type {
    VendorStep1Schema,
    VendorStep2Schema,
    VendorStep3Schema,
    VendorStep4Schema,
} from "./vendor.schema";
