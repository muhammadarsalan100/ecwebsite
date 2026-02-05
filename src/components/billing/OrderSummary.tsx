"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ProductItem } from "@/types";

const PRODUCTS: ProductItem[] = [
    { id: "1", name: "LCD Monitor", image: "/p-1.jpg", price: 650 },
    { id: "2", name: "H1 Gamepad", image: "/p-2.jpg", price: 1100 },
];

const SummaryRow = ({ label, value, isBold = false, isLast = false }: { label: string; value: string | number; isBold?: boolean; isLast?: boolean }) => (
    <div className={`flex justify-between items-center py-2 ${!isLast ? 'border-b border-gray-100' : ''} text-black`}>
        <span>{label}:</span>
        <span className={isBold ? "font-bold" : "font-medium"}>{typeof value === 'number' ? `$${value}` : value}</span>
    </div>
);

export function OrderSummary() {
    const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank")

    const subtotal = PRODUCTS.reduce((acc, item) => acc + item.price, 0)
    const total = subtotal

    return (
        <div className="flex-1 lg:max-w-[500px] mt-4">
            <div className="w-full space-y-6">
                {/* Product List */}
                <div className="space-y-6 mb-8">
                    {PRODUCTS.map((product) => (
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
                <div className="space-y-4 border-b border-gray-200 pb-6 mb-6 font-poppins">
                    <SummaryRow label="Subtotal" value={subtotal} />
                    <SummaryRow label="Shipping" value="Free" />
                    <SummaryRow label="Total" value={total} isBold isLast />
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                id="bank"
                                name="payment"
                                className="w-4 h-4 accent-black cursor-pointer"
                                checked={paymentMethod === "bank"}
                                onChange={() => setPaymentMethod("bank")}
                            />
                            <label htmlFor="bank" className="text-black cursor-pointer">
                                Bank
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            {['c1', 'c2', 'c3', 'c4'].map((card) => (
                                <Image key={card} src={`/${card}.png`} alt="Payment Card" width={52} height={32} className="object-contain" unoptimized />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            id="cod"
                            name="payment"
                            className="w-4 h-4 accent-black cursor-pointer"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                        />
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
                    <Button className="h-12 px-8 bg-[#0092FF] hover:bg-[#0092FF]/90 text-white rounded-[4px] font-medium transition-all active:scale-95">
                        Apply Coupon
                    </Button>
                </div>

                {/* Place Order */}
                <Button className="w-auto h-12 px-10 bg-[#0092FF] hover:bg-[#0092FF]/90 text-white rounded-[4px] font-medium transition-all active:scale-95">
                    Place Order
                </Button>
            </div>
        </div>
    )
}
