"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { VendorAuthLanding } from "@/components/auth/VendorAuthLanding";
import { Suspense } from "react";
import banner from "../../../../public/banner.png";

function VendorAuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialError = searchParams.get("error");

    const handleContinue = (email: string, initCode: string) => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("vendorEmail", email);
            sessionStorage.setItem("vendorInitCode", initCode);
        }
        router.push("/vendor/register");
    };

    return (
        <div className="flex h-screen w-full">
            <div className="relative hidden w-1/2 md:flex overflow-hidden">
                <div className="relative w-full h-full max-w-[700px]">
                    <Image
                        src={banner}
                        alt="Vendor Auth Banner"
                        priority
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="flex w-full md:w-1/2 items-center justify-start sm:px-10">
                <VendorAuthLanding
                    onContinue={handleContinue}
                    onBack={() => router.push("/auth")}
                    initialError={initialError}
                />
            </div>
        </div>
    );
}

export default function VendorAuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VendorAuthContent />
        </Suspense>
    );
}
