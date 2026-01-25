"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ProductItem {
    id: string
    name: string
    image: string
    price: number
}

const defaultProducts: ProductItem[] = [
    {
        id: "1",
        name: "LCD Monitor",
        image: "/p-1.jpg",
        price: 650,
    },
    {
        id: "2",
        name: "H1 Gamepad",
        image: "/p-2.jpg",
        price: 1100,
    },
]

export function OrderSummary() {
    const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank")

    const subtotal = defaultProducts.reduce((acc, item) => acc + item.price, 0)
    const total = subtotal // Add shipping logic if needed

    return (
        <div className="flex-1 lg:max-w-[500px] mt-4">
            <div className="w-full space-y-6">
                {/* Product List */}
                <div className="space-y-6 mb-8">
                    {defaultProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={54}
                                        height={54}
                                        className="object-contain"
                                        quality={100}
                                        priority
                                        unoptimized
                                    />
                                </div>
                                <span className="text-black font-medium">{product.name}</span>
                            </div>
                            <span className="text-black font-medium">${product.price}</span>
                        </div>
                    ))}
                </div>

                {/* Price Summary */}
                <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-black">Subtotal:</span>
                        <span className="text-black font-medium">${subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-black">Shipping:</span>
                        <span className="text-black font-medium">Free</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-black">
                        <span className="text-black">Total:</span>
                        <span className="text-black font-bold">${total}</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center">
                                <input
                                    type="radio"
                                    id="bank"
                                    name="payment"
                                    className="w-4 h-4 accent-black cursor-pointer"
                                    checked={paymentMethod === "bank"}
                                    onChange={() => setPaymentMethod("bank")}
                                />
                            </div>
                            <label htmlFor="bank" className="text-black cursor-pointer">
                                Bank
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src="/c1.png" alt="Visa" width={52} height={32} className="object-contain" unoptimized quality={100} />
                            <Image src="/c2.png" alt="Mastercard" width={52} height={32} className="object-contain" unoptimized quality={100} />
                            <Image src="/c3.png" alt="Nagad" width={52} height={32} className="object-contain" unoptimized quality={100} />
                            <Image src="/c4.png" alt="Bkash" width={52} height={32} className="object-contain" unoptimized quality={100} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center">
                            <input
                                type="radio"
                                id="cod"
                                name="payment"
                                className="w-4 h-4 accent-black cursor-pointer"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                        </div>
                        <label htmlFor="cod" className="text-black cursor-pointer">
                            Cash on delivery
                        </label>
                    </div>
                </div>

                {/* Coupon */}
                <div className="flex gap-4 mb-6">
                    <Input
                        placeholder="Coupon Code"
                        className="h-12 bg-transparent border-gray-400 rounded-[4px] placeholder:text-gray-400"
                    />
                    <Button
                        className="h-12 px-8 bg-[#0092FF] hover:bg-[#0092FF]/90 text-white rounded-[4px] font-medium"
                    >
                        Apply Coupon
                    </Button>
                </div>

                {/* Place Order */}
                <Button
                    className="w-auto h-12 px-10 bg-[#0092FF] hover:bg-[#0092FF]/90 text-white rounded-[4px] font-medium"
                    style={{ float: "left" }}
                >
                    Place Order
                </Button>
            </div>
        </div>
    )
}
