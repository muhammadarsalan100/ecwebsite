"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "@/lib/auth-context";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NavTopBar } from "./navbar/NavTopBar";
import { LocationSelector } from "./navbar/LocationSelector";
import { SearchBar } from "./navbar/SearchBar";
import { UserActions } from "./navbar/UserActions";
import { MobileMenu } from "./navbar/MobileMenu";
import { Language, LANGUAGES } from "./LanguageSelector";
import { useCartStore, useCartSubtotal } from "@/lib/store/cartStore";
import { useConfigStore } from "@/lib/store/configStore";


export default function Navbar() {
  // Custom Hooks
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();
  const { countries, fetchCountries, selectedCountry, setSelectedCountry } = useConfigStore();

  // State Hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMobileRegionOpen, setIsMobileRegionOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [hasHydrated, setHasHydrated] = useState(false);

  // Sync hydration state
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchCountries();
    }
  }, [fetchCountries, isLoading]);

  useEffect(() => {
    // Only set default if we have hydrated and still no country is selected
    if (hasHydrated && !selectedCountry && countries.length > 0) {
      // Find UAE with thorough matching
      const uae = countries.find(c =>
        c.shortCode?.toUpperCase() === "UAE" ||
        c.shortCode?.toUpperCase() === "AE" ||
        c.name.toLowerCase().includes("emirates") ||
        c.name.toLowerCase() === "uae"
      );

      // Priority 1: UAE, Priority 2: Pakistan, Priority 3: First available
      if (uae) {
        setSelectedCountry(uae);
      } else {
        const pk = countries.find(c =>
          c.shortCode?.toUpperCase() === "PK" ||
          c.name.toLowerCase() === "pakistan"
        );
        setSelectedCountry(pk || countries[0]);
      }
    }
  }, [countries, selectedCountry, setSelectedCountry, hasHydrated]);

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Ref Hooks
  const regionRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Click Outside Handlers
  useClickOutside(regionRef, () => setIsRegionOpen(false));
  useClickOutside(locationRef, () => setIsLocationOpen(false));
  useClickOutside(authRef, () => setIsAuthOpen(false));
  useClickOutside(walletRef, () => setIsWalletOpen(false));
  useClickOutside(cartRef, () => setIsCartOpen(false));
  useClickOutside(langRef, () => setIsLangOpen(false));

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // Navigation Handlers
  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      router.push(path);
    }
  };

  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartSubtotal();

  return (
    <div className='flex flex-col w-full z-50 relative font-poppins text-foreground'>
      <NavTopBar
        isLangOpen={isLangOpen}
        setIsLangOpen={setIsLangOpen}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        langRef={langRef}
      />

      <nav className='bg-[#0092FF] text-white sticky top-0 z-40 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-24 gap-6'>
            {/* Logo & Location */}
            <div className='shrink-0 flex items-center gap-8'>
              <Link href='/' className='flex items-center gap-2 text-2xl font-bold tracking-tight'>
                <Image
                  src="/Logo1.png"
                  alt="Logo"
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain"
                  priority
                  style={{ height: '40px', width: 'auto' }}
                />
              </Link>
              <LocationSelector
                isLocationOpen={isLocationOpen}
                setIsLocationOpen={setIsLocationOpen}
                locationRef={locationRef}
                selectedCountry={selectedCountry}
              />
            </div>

            {/* Desktop Search */}
            <SearchBar />

            {/* Desktop Actions */}
            <UserActions
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
              user={user}
              logout={logout}
              isAuthOpen={isAuthOpen}
              setIsAuthOpen={setIsAuthOpen}
              isWalletOpen={isWalletOpen}
              setIsWalletOpen={setIsWalletOpen}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              isRegionOpen={isRegionOpen}
              setIsRegionOpen={setIsRegionOpen}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countries={countries}
              authRef={authRef}
              walletRef={walletRef}
              cartRef={cartRef}
              regionRef={regionRef}
            />

            {/* Mobile Menu Buttons */}
            <div className='md:hidden flex items-center gap-5'>
              <button
                onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsMenuOpen(false); }}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <Search className='w-6 h-6' />
                <span className="text-[10px] font-bold">Search</span>
              </button>

              <Link
                href='/wallet'
                onClick={(e) => handleProtectedNavigation(e, '/wallet')}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <Image src="/Wallet.png" alt="Wallet" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-[10px] font-bold">$0.00</span>
              </Link>

              <Link
                href='/cart'
                onClick={(e) => handleProtectedNavigation(e, '/cart')}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <div className="relative">
                  <ShoppingCart className='w-6 h-6' />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold">${subtotal.toFixed(2)}</span>
              </Link>

              <button
                onClick={() => { setIsMenuOpen(true); setIsMobileSearchOpen(false); }}
                className='flex flex-col items-center gap-1 hover:opacity-80 transition-opacity'
              >
                <Menu className='w-7 h-7' />
                <span className="text-[10px] font-bold">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sidebar */}
        <MobileMenu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          user={user}
          logout={logout}
          isMobileRegionOpen={isMobileRegionOpen}
          setIsMobileRegionOpen={setIsMobileRegionOpen}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          countries={countries}
        />

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-blue-400/30 bg-[#0092FF] overflow-hidden"
            >
              <SearchBar isMobile onClose={() => setIsMobileSearchOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
