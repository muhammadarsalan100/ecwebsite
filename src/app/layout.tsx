import type { Metadata } from "next";
import { Outfit, Readex_Pro, Poppins } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

const readexPro = Readex_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-readex-pro",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Outfit - Premium Fashion & Lifestyle",
  description: "Discover quality fashion that reflects your style. Shop the latest summer arrivals, electronics, and accessories with Outfit.",
};

import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${outfit.className} ${readexPro.variable} ${poppins.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
