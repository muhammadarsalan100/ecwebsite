"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Plus,
  Minus,
  ArrowRight,
  Star
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { USER_ROLES } from "@/constants";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: "/Registericon.png",
    title: "Register for Free",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    icon: "/GeneralInfoicon.png",
    title: "Add General Info",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    icon: "/Bankinfoicon.png",
    title: "Add Bank Info",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    icon: "/businesscaricon.png",
    title: "Business Info & ID Proof",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    icon: "/listproducticon.png",
    title: "List your Products",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  }
];

const PRODUCTS = [
  {
    id: 1,
    title: "Summer Girl shirts",
    price: 34.99,
    rating: 5,
    image: "/p-1.jpg"
  },
  {
    id: 2,
    title: "Summer Clothes",
    price: 34.00,
    rating: 5,
    image: "/p-2.jpg"
  },
  {
    id: 3,
    title: "Water Bottle",
    price: 34.99,
    rating: 4,
    image: "/p-3.jpg"
  },
  {
    id: 4,
    title: "Formal Shirt Women",
    price: 34.99,
    rating: 5,
    image: "/p-4.jpg"
  }
];

const FAQS = [
  {
    question: "How do I update my profile information?",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    question: "How do I contact customer support?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time through your account settings."
  },
  {
    question: "Do you offer any discounts for yearly plans?",
    answer: "Yes, we offer a 20% discount if you choose our yearly billing option."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers."
  }
];

export default function BecomeASellerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleJoin = () => {
    if (isAuthenticated && user?.role === USER_ROLES.VENDOR) {
      router.push("/vendor/register");
    } else {
      router.push("/vendor/auth");
    }
  };

  return (
    <div className="bg-white min-h-screen font-poppins">
      {/* 1. Header Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1440px] mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Become a Seller in 5 Simple Steps</h1>
          <p className="max-w-3xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20 mt-16">
            {/* First 3 Steps */}
            {STEPS.slice(0, 3).map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 relative">
                  <Image src={step.icon} alt={step.title} fill className="object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 leading-tight">{step.title}</h3>
                <p className="text-[12px] text-gray-400 leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {/* Bottom 2 Steps */}
            {STEPS.slice(3, 5).map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 relative">
                  <Image src={step.icon} alt={step.title} fill className="object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 leading-tight">{step.title}</h3>
                <p className="text-[12px] text-gray-400 leading-relaxed px-12">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={handleJoin}
            className="mt-12 bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Let's Go
          </button>
        </div>
      </section>

      {/* 2. Top-Seller Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top-Seller Product Collection</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50 transition-colors shadow-sm">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
              <button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50 transition-colors shadow-sm">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all group overflow-hidden border border-gray-100/50">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{product.title}</h3>
                <p className="text-[10px] text-gray-400 mb-3">Lorem Ipsum is simply</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0092FF]">${product.price}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-3 h-3", i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200")} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Banner Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="bg-[#FAF4F4] rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center relative min-h-[300px]">
            <div className="p-8 md:p-16 flex-1 space-y-6 z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-md">
                We make online selling easy and profitable.
              </h2>
              <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <button 
                onClick={handleJoin}
                className="bg-[#FFC700] hover:bg-[#E6B400] text-gray-900 font-bold py-3 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                Become a Seller
              </button>
            </div>
            <div className="flex-1 relative w-full h-[300px] md:h-full min-h-[400px]">
              <Image src="/Banner.png" alt="Selling" fill className="object-contain object-bottom md:object-right-bottom scale-90" priority />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">FAQ&apos;s</h2>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className={cn(
                        "w-full flex items-center justify-between p-5 text-left transition-all",
                        openFaq === idx ? "bg-[#0092FF] text-white" : "hover:bg-gray-50 text-gray-900"
                      )}
                    >
                      <span className="font-bold text-sm">{faq.question}</span>
                      {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 text-xs text-gray-500 leading-relaxed bg-white border-t border-gray-50">
                            {faq.answer}
                            {idx === 1 && (
                              <ul className="mt-4 space-y-2 list-disc pl-4 text-gray-400">
                                <li>Check our knowledge base first.</li>
                                <li>Submit a ticket with detailed info.</li>
                                <li>Read the documentation carefully.</li>
                                <li>Contact with details.</li>
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Form */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="bg-[#EAF6FF] rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Don&apos;t find your answer from our faq section?</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <form className="space-y-4">
                  <input type="text" placeholder="Full name" className="w-full bg-white border-none p-4 rounded-xl text-sm focus:ring-2 focus:ring-[#0092FF] outline-none" />
                  <input type="email" placeholder="Email" className="w-full bg-white border-none p-4 rounded-xl text-sm focus:ring-2 focus:ring-[#0092FF] outline-none" />
                  <textarea placeholder="Message" rows={4} className="w-full bg-white border-none p-4 rounded-xl text-sm focus:ring-2 focus:ring-[#0092FF] outline-none resize-none" />
                  <button className="w-full bg-[#0092FF] hover:bg-[#0081E0] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20">
                    SEND MESSAGE
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding Section */}
      <section className="py-20 bg-[#0092FF] text-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 text-center">
          <h2 className="text-4xl font-bold mb-12">Mega Mart</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left">
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <p className="text-sm opacity-80">(+1) 123 456 789</p>
              <p className="text-sm opacity-80">support@megamart.com</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-6">Popular Categories</h4>
              <p className="text-sm opacity-80">Fashion</p>
              <p className="text-sm opacity-80">Electronics</p>
              <p className="text-sm opacity-80">Home & Kitchen</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-6">Customer Service</h4>
              <p className="text-sm opacity-80">Terms & Conditions</p>
              <p className="text-sm opacity-80">Privacy Policy</p>
              <p className="text-sm opacity-80">Refund Policy</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-6">Download App</h4>
              <div className="flex gap-4">
                <div className="w-32 h-10 bg-black rounded border border-white/10" />
                <div className="w-32 h-10 bg-black rounded border border-white/10" />
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 opacity-60 text-sm">
            © 2024 Mega Mart. All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
}
