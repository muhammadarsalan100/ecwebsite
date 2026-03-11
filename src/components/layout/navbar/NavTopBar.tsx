"use client";

import Link from "next/link";
import { LanguageSelector, Language } from "../LanguageSelector";

interface NavTopBarProps {
    isLangOpen: boolean;
    setIsLangOpen: (isOpen: boolean) => void;
    selectedLang: Language;
    setSelectedLang: (lang: Language) => void;
    langRef: React.RefObject<HTMLDivElement | null>;
}

export function NavTopBar({
    isLangOpen,
    setIsLangOpen,
    selectedLang,
    setSelectedLang,
    langRef
}: NavTopBarProps) {
    return (
        <div className='bg-black text-white text-xs py-3'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0'>
                <div className='hidden md:block w-1/4'></div>
                <div className='flex-1 text-center font-medium'>
                    <span className='opacity-90'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
                    <Link href='/shop' className='font-bold underline ml-2 hover:text-blue-400 transition-colors'>ShopNow</Link>
                </div>
                <div className='w-auto md:w-1/4 flex justify-center md:justify-end'>
                    <div ref={langRef}>
                        <LanguageSelector
                            isOpen={isLangOpen}
                            setIsOpen={setIsLangOpen}
                            selectedLang={selectedLang}
                            onSelect={setSelectedLang}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
