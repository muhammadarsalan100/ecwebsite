"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function BillingForm() {
    return (
        <div className="flex-1 space-y-8">
            <div className="space-y-12">
                <div className="flex flex-col gap-3">
                    <label htmlFor="firstName" className="text-sm md:text-base text-gray-400">
                        First Name
                    </label>
                    <Input
                        id="firstName"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="lastName" className="text-sm md:text-base text-gray-400">
                        Last Name
                    </label>
                    <Input
                        id="lastName"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="streetAddress" className="text-sm md:text-base text-gray-400">
                        Street Address
                    </label>
                    <Input
                        id="streetAddress"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="apartment" className="text-sm md:text-base text-gray-400">
                        Apartment, floor, etc (optional)
                    </label>
                    <Input
                        id="apartment"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="city" className="text-sm md:text-base text-gray-400">
                        Town/City
                    </label>
                    <Input
                        id="city"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="phone" className="text-sm md:text-base text-gray-400">
                        Phone Number
                    </label>
                    <Input
                        id="phone"
                        type="tel"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-sm md:text-base text-gray-400">
                        Email Address
                    </label>
                    <Input
                        id="email"
                        type="email"
                        className="h-12 bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0092FF] rounded-[4px]"
                    />
                </div>
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
