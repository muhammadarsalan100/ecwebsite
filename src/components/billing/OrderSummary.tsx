"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

import { ProductItem } from "@/types";

import { useCartStore, useCartSubtotal } from "@/lib/store/cartStore";

const SummaryRow = ({ label, value, isBold = false, isLast = false }: { label: string; value: string | number; isBold?: boolean; isLast?: boolean }) => (
    <div className={`flex justify-between items-center py-2 ${!isLast ? 'border-b border-gray-100' : ''} text-black`}>
        <span>{label}:</span>
        <span className={isBold ? "font-bold" : "font-medium"}>{typeof value === 'number' ? `$${value}` : value}</span>
    </div>
);

export function OrderSummary() {
    const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank")
    const cartItems = useCartStore((state) => state.items);
    const subtotal = useCartSubtotal();
    const total = subtotal

    return (
        <div className="flex-1 lg:max-w-[500px] mt-4">
            <div className="w-full space-y-6">
                {/* Product List */}
                <div className="space-y-6 mb-8">
                    {cartItems.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-100 px-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-50 transition-all hover:scale-105">
                                <ShoppingCart className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No items to checkout</h3>
                            <p className="text-sm text-gray-500 mb-8 max-w-[280px] text-center">Your shopping cart is currently empty. Add some products before proceeding to checkout.</p>
                            <Link
                                href="/"
                                className="px-10 py-4 bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                            >
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((product) => (
                            <div key={`${product.id}-${product.color}-${product.size}`} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            width={54}
                                            height={54}
                                            className="object-contain"
                                            quality={100}
                                            priority
                                            unoptimized
                                        />
                                        {product.quantity > 1 && (
                                            <span className="absolute top-0 right-0 bg-[#0092FF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">
                                                {product.quantity}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-black font-medium text-sm leading-tight">{product.title}</span>
                                        {product.size || product.color ? (
                                            <span className="text-gray-400 text-[10px] font-medium uppercase mt-0.5">
                                                {product.color && `${product.color}`}
                                                {product.size && ` | ${product.size}`}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <span className="text-black font-medium">${(product.price * product.quantity).toFixed(2)}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Price Summary */}
                <div className="space-y-4 border-b border-gray-200 pb-6 mb-6 font-poppins">
                    <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                    <SummaryRow label="Shipping" value="Free" />
                    <SummaryRow label="Total" value={`$${total.toFixed(2)}`} isBold isLast />
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
                <Button className="w-full lg:w-auto h-12 px-10 bg-[#0092FF] hover:bg-[#0092FF]/90 text-white rounded-[4px] font-medium transition-all active:scale-95">
                    Place Order
                </Button>
            </div>
        </div>
    )
}
