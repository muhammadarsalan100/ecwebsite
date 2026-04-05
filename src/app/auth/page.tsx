"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import banner from "../../../public/banner.png";
import { AuthLanding } from "@/components/auth/AuthLanding";
import { AuthLogin } from "@/components/auth/AuthLogin";
import { AuthRegister } from "@/components/auth/AuthRegister";
import { AuthOTP } from "@/components/auth/AuthOTP";
import { AuthWelcome } from "@/components/auth/AuthWelcome";
import { useRouter } from "next/navigation";
import { AuthView } from "@/types/auth";
import { Loader } from "@/components/ui/loader";

export default function LoginPage() {
  const [view, setView] = useState<AuthView>("LANDING");
  const [previousView, setPreviousView] = useState<AuthView>("LANDING");
  const [authEmail, setAuthEmail] = useState("");
  const [authFullName, setAuthFullName] = useState("");
  const [requestCode, setRequestCode] = useState<string | undefined>(undefined);
  const [loginSessionId, setLoginSessionId] = useState<string | undefined>(undefined);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated, but NOT if we are in the WELCOME selection view
  useEffect(() => {
    if (!isLoading && isAuthenticated && view !== "WELCOME") {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router, view]);

  const handleStartOTP = (email: string, fullName: string = "", code?: string, sessionId?: string) => {
    setAuthEmail(email);
    setAuthFullName(fullName);
    setRequestCode(code);
    setLoginSessionId(sessionId);
    setPreviousView(view);
    setView("OTP");
  };

  const renderContent = () => {
    switch (view) {
      case "LANDING":
        return (
          <AuthLanding
            onSignIn={() => setView("LOGIN")}
            onCreateAccount={() => setView("REGISTER")}
            onSkip={() => router.push("/")}
            onBecomeSeller={() => router.push("/vendor/auth")}
          />
        );
      case "LOGIN":
        return (
          <AuthLogin
            onRegister={() => setView("REGISTER")}
            onBack={() => setView("LANDING")}
            onLogin={(email, sessionId) => handleStartOTP(email, "", undefined, sessionId)}
          />
        );
      case "REGISTER":
        return (
          <AuthRegister
            onSignIn={() => setView("LOGIN")}
            onBack={() => setView("LANDING")}
            onSuccess={(email, fullName, code) => handleStartOTP(email, fullName, code)}
          />
        );
      case "OTP":
        return (
          <AuthOTP
            email={authEmail}
            fullName={authFullName}
            requestCode={requestCode}
            loginSessionId={loginSessionId}
            onContinue={(otpOrData) => {
              try {
                // If it's JSON, it's login data
                const userData = JSON.parse(otpOrData);
                if (userData.accessToken) {
                  login({
                    email: authEmail,
                    name: userData.user.fullname,
                    fullname: userData.user.fullname,
                    id: userData.user.id,
                    role: userData.user.role,
                    accessToken: userData.accessToken,
                    idToken: userData.idToken,
                    refreshToken: userData.refreshToken
                  }, false);
                  setView("WELCOME");
                  return;
                }
              } catch (e) {
                // Not JSON, probably just the OTP code from registration
                login({ email: authEmail, name: authFullName }, false);
                setView("WELCOME");
                return;
              }
            }}
            onBack={() => setView(previousView)}
          />
        );
      case "WELCOME":
        return (
          <AuthWelcome
            onContinue={() => router.push("/")}
          />
        );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='flex h-screen w-full'>
      {/* LEFT IMAGE SECTION */}
      <div className='relative hidden w-1/2 md:flex overflow-hidden'>
        <div className="relative w-full h-full max-w-[700px]">
          <Image
            src={banner}
            alt='Auth Banner'
            priority
            fill
            className='object-contain'
          />
        </div>
      </div>

      {/* RIGHT CONTENT SECTION */}
      <div className='flex w-full md:w-1/2 items-center justify-start sm:px-10 '>
        {renderContent()}
      </div>
    </div>
  );
}
