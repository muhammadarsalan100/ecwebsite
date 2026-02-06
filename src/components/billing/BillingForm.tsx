"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { BillingField } from "@/types"

const BILLING_FIELDS: BillingField[] = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "streetAddress", label: "Street Address" },
    { id: "apartment", label: "Apartment, floor, etc (optional)" },
    { id: "city", label: "Town/City" },
    { id: "phone", label: "Phone Number", type: "tel" },
    { id: "email", label: "Email Address", type: "email" },
];

export function BillingForm() {
    return (
        <div className="flex-1 space-y-8">
            <div className="space-y-8 md:space-y-12">
                {BILLING_FIELDS.map((field) => (
                    <div key={field.id} className="flex flex-col gap-3">
                        <label htmlFor={field.id} className="text-sm md:text-base text-gray-400">
                            {field.label}
                        </label>
                        <Input
                            id={field.id}
                            type={field.type || "text"}
                            className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-3 pt-2">
                <Checkbox id="saveInfo" className="border-gray-400 data-[state=checked]:bg-[#0092FF] data-[state=checked]:border-[#0092FF]" />
                <label
                    htmlFor="saveInfo"
                    className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
                >
                    Save this information for faster check-out next time
                </label>
            </div>
        </div>
    )
}
