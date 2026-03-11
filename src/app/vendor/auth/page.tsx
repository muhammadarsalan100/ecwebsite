"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { VendorAuthLanding } from "@/components/auth/VendorAuthLanding";
import banner from "../../../../public/banner.png";

export default function VendorAuthPage() {
    const router = useRouter();

    const handleContinue = (email: string, initCode: string) => {
        // Store sensitive data in sessionStorage to avoid exposure in the URL
        if (typeof window !== "undefined") {
            sessionStorage.setItem("vendorEmail", email);
            sessionStorage.setItem("vendorInitCode", initCode);
        }
        // Navigate with a clean URL
        router.push("/vendor/register");
    };

    return (
        <div className="flex h-screen w-full">
            {/* LEFT IMAGE SECTION */}
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

            {/* RIGHT CONTENT SECTION */}
            <div className="flex w-full md:w-1/2 items-center justify-start sm:px-10">
                <VendorAuthLanding
                    onContinue={handleContinue}
                    onBack={() => router.push("/auth")}
                />
            </div>
        </div>
    );
}
