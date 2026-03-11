"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { VendorSidebar } from "@/components/vendor/VendorSidebar";
import { Step1Profile, Step1Data } from "@/components/vendor/steps/Step1Profile";
import { Step2BankAccount, Step2Data } from "@/components/vendor/steps/Step2BankAccount";
import { Step3BusinessInfo, Step3Data } from "@/components/vendor/steps/Step3BusinessInfo";
import { Step4IdentityProof, Step4Data } from "@/components/vendor/steps/Step4IdentityProof";
import { vendorService } from "@/services/vendorService";
import { VendorRegistrationResponse } from "@/types/vendor";

// ─── Default form state ───────────────────────────────────────────────────────

const defaultStep1: Step1Data = { fullName: "", email: "", phoneNumber: "", streetAddress: "" };
const defaultStep2: Step2Data = { bankName: "", accountTitle: "", accountNumber: "", branchCode: "", iban: "", bankStatementFile: null };
const defaultStep3: Step3Data = { country: "", zipCode: "", state: "", city: "", addressLine1: "", addressLine2: "" };
const defaultStep4: Step4Data = { passportNumber: "", passportIssueDate: "", passportExpiryDate: "", passportImage: null, idCardIssueDate: "", idCardExpiryDate: "", idCardNumber: "", idCardFrontImage: null, idCardBackImage: null };

const STEP_LABELS = ["Profile", "Bank Account", "Business Information", "Identity Proof"];

export default function VendorRegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [initCode, setInitCode] = useState("");
    const [isChecking, setIsChecking] = useState(true);

    const [currentStep, setCurrentStep] = useState(1);
    const [step1, setStep1] = useState<Step1Data>(defaultStep1);
    const [step2, setStep2] = useState<Step2Data>(defaultStep2);
    const [step3, setStep3] = useState<Step3Data>(defaultStep3);
    const [step4, setStep4] = useState<Step4Data>(defaultStep4);

    // Load data from sessionStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEmail = sessionStorage.getItem("vendorEmail") || "";
            const storedInitCode = sessionStorage.getItem("vendorInitCode") || "";

            if (!storedInitCode) {
                router.replace("/vendor/auth");
            } else {
                setEmail(storedEmail);
                setInitCode(storedInitCode);
                setStep1((prev) => ({ ...prev, email: storedEmail }));
                setIsChecking(false);
            }
        }
    }, [router]);

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleBack = () => {
        if (currentStep === 1) {
            router.push("/vendor/auth");
            return;
        }
        setCurrentStep((p) => p - 1);
    };

    const handleDone = async () => {
        setIsLoading(true);
        setApiError(null);
        try {
            const vendorData = {
                email: step1.email,
                fullName: step1.fullName,
                phoneNo: step1.phoneNumber,
                bankAccount: {
                    accountHolderName: step2.accountTitle,
                    accountTitle: step2.accountTitle,
                    accountNumber: step2.accountNumber,
                    bankName: step2.bankName,
                    branchCode: step2.branchCode,
                    // Note: 'iban' removed from JSON if not in Postman example
                },
                business: {
                    countryId: parseInt(step3.countryId?.toString() || "") || 3,
                    stateId: parseInt(step3.stateId?.toString() || "") || 3,
                    cityId: parseInt(step3.cityId?.toString() || "") || 3,
                    addressLine1: step3.addressLine1,
                    addressLine2: step3.addressLine2,
                    zipCode: step3.zipCode
                },
                identity: {
                    passportNumber: step4.passportNumber,
                    passportIssueDate: step4.passportIssueDate,
                    passportExpiryDate: step4.passportExpiryDate,
                    nationalIdNumber: step4.idCardNumber,
                    nationalIdIssueDate: step4.idCardIssueDate,
                    nationalIdExpiryDate: step4.idCardExpiryDate
                }
            };

            const fd = new FormData();
            fd.append("initCode", initCode);
            fd.append("vendorJson", JSON.stringify(vendorData));

            if (step2.bankStatementFile) fd.append("bankDocument", step2.bankStatementFile);
            if (step4.passportImage) fd.append("passportDocument", step4.passportImage);
            if (step4.idCardFrontImage) fd.append("nationalIdDocumentFront", step4.idCardFrontImage);
            if (step4.idCardBackImage) fd.append("nationalIdDocumentBack", step4.idCardBackImage);

            const response = await vendorService.requestOTP(fd) as VendorRegistrationResponse;

            if (response.code === "OK") {
                // Success
                sessionStorage.removeItem("vendorEmail");
                sessionStorage.removeItem("vendorInitCode");

                // Store the registration code for the next step (OTP verification)
                if (response.data?.code) {
                    sessionStorage.setItem("vendorRegCode", response.data.code);
                }

                // Navigate to OTP verification
                router.push("/vendor/otp");
            } else {
                setApiError(response.message || "Registration failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Registration failed:", error);
            setApiError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isChecking) {
        return <div className="h-[400px] sm:h-[600px] flex items-center justify-center bg-gray-50">
            <div className="w-8 h-8 border-4 border-[#0092FF] border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    return (
        <div className="min-h-0 sm:min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5">
                <nav className="flex items-center gap-1 text-sm text-gray-500" style={{ fontFamily: "var(--font-poppins)" }}>
                    <Link href="/" className="hover:text-[#0092FF] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-500">Become a Seller</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#0092FF] font-semibold">{STEP_LABELS[currentStep - 1]}</span>
                </nav>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-8 sm:pb-16 flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
                {/* Mobile Step Indicator */}
                <div className="w-full md:hidden bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-2">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step {currentStep} of {STEP_LABELS.length}</span>
                        <span className="text-sm font-bold text-[#0092FF]">{STEP_LABELS[currentStep - 1]}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#0092FF] transition-all duration-500"
                            style={{ width: `${(currentStep / STEP_LABELS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Left Sidebar - Desktop only */}
                <div className="hidden md:block sticky top-24">
                    <VendorSidebar email={email} currentStep={currentStep} />
                </div>

                {/* Right Form Panel */}
                <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-10 min-h-0 sm:min-h-[600px]">
                    {apiError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-shake">
                            <span className="font-semibold">Error:</span> {apiError}
                        </div>
                    )}
                    {currentStep === 1 && (
                        <Step1Profile
                            data={step1}
                            onChange={setStep1}
                            onNext={() => setCurrentStep(2)}
                            onBack={handleBack}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2BankAccount
                            data={step2}
                            onChange={setStep2}
                            onNext={() => setCurrentStep(3)}
                            onBack={handleBack}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3BusinessInfo
                            data={step3}
                            onChange={setStep3}
                            onNext={() => setCurrentStep(4)}
                            onBack={handleBack}
                        />
                    )}
                    {currentStep === 4 && (
                        <Step4IdentityProof
                            data={step4}
                            onChange={setStep4}
                            onDone={handleDone}
                            onBack={handleBack}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
