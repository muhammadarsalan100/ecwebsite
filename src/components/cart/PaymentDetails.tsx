"use client";

import { useRouter } from "next/navigation";

interface PaymentDetailsProps {
    subtotal: number;
    discount: number;
    shipmentCost: number;
    total: number;
    currencySymbol: string;
}

export const PaymentDetails = ({ subtotal, discount, shipmentCost, total, currencySymbol }: PaymentDetailsProps) => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-gray-50 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Details</h3>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Subtotal</span>
                    <span className="text-sm font-bold text-gray-900">{currencySymbol}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Discount</span>
                    <span className="text-sm font-bold text-red-500">-{currencySymbol}{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500">Shipment cost</span>
                    <span className="text-sm font-bold text-gray-900">{currencySymbol}{shipmentCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-gray-900">Grand Total</span>
                    <span className="text-xl font-bold text-[#0092FF]">{currencySymbol}{total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => router.push("/billing")}
                className="w-full bg-[#0092FF] hover:bg-[#0081E0] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
                Proceed to checkout
            </button>
        </div>
    );
};
