"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  Plus,
  ChevronDown,
  Store,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "@/lib/auth-context";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  console.log('user', user)
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
      <nav className='bg-[#0092FF] text-white sticky top-0 p-1 z-[60] shadow-sm'>
        <div className='max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16'>
          <div className='relative flex items-center h-16 justify-between gap-2'>
            {/* Logo & Location */}
            <div className='flex items-center gap-2 sm:gap-6 shrink-0'>
              <Link href='/' className='flex items-center'>
                <Image
                  src="/Logo1.png"
                  alt="Logo"
                  width={140}
                  height={36}
                  className="h-7 sm:h-9 w-auto object-contain"
                  priority
                  style={{ width: 'auto' }}
                />
              </Link>
              <div className="hidden lg:block">
                <LocationSelector
                  isLocationOpen={isLocationOpen}
                  setIsLocationOpen={setIsLocationOpen}
                  locationRef={locationRef}
                  selectedCountry={selectedCountry}
                />
              </div>
            </div>

            {/* Desktop Search */}
            <SearchBar />

            {/* Become a Seller (Desktop/Tablet) */}
            <Link
              href="/become-a-seller"
              className="hidden md:flex items-center gap-3 px-4 py-2 hover:bg-white/10 rounded-2xl transition-all group shrink-0"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-black/5">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div className="hidden xl:block">
                <p className="text-[10px] text-white/80 font-medium mb-0.5">Partner with us</p>
                <p className="text-[13px] text-white font-bold whitespace-nowrap leading-none tracking-tight">Become a Seller</p>
              </div>
            </Link>

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
              isLangOpen={isLangOpen}
              setIsLangOpen={setIsLangOpen}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
              langRef={langRef}
              authRef={authRef}
              walletRef={walletRef}
              cartRef={cartRef}
            />

            {/* Mobile Menu Buttons */}
            <div className='md:hidden flex items-center gap-3 xs:gap-5 shrink-0'>
              <button
                onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsMenuOpen(false); }}
                className='flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity'
              >
                <Search className='w-5 h-5' />
                <span className="text-[9px] font-bold">Search</span>
              </button>

              <Link
                href='/wallet'
                onClick={(e) => handleProtectedNavigation(e, '/wallet')}
                className='flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity'
              >
                <Image src="/Wallet.png" alt="Wallet" width={20} height={20} className="w-5 h-5 object-contain" />
                <span className="text-[9px] font-bold">$0</span>
              </Link>

              <Link
                href='/cart'
                onClick={(e) => handleProtectedNavigation(e, '/cart')}
                className='flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity'
              >
                <div className="relative">
                  <ShoppingCart className='w-5 h-5' />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-bold">${Math.round(subtotal)}</span>
              </Link>

              <button
                onClick={() => { setIsMenuOpen(true); setIsMobileSearchOpen(false); }}
                className='flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity'
              >
                <Menu className='w-6 h-6' />
                <span className="text-[9px] font-bold">Menu</span>
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
