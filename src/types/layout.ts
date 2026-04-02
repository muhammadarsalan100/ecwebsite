import { Country } from "./config";

export interface NavbarCountry {
    id: number;
    name: string;
    flagUrl: string;
    shortCode: string;
}

export interface RegionSelectorProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedCountry: Country | null;
    setSelectedCountry: (country: Country) => void;
    countries: Country[];
    isMobile?: boolean;
}

export interface NavCategory {
    id: string;
    name: string;
    hasDropdown?: boolean;
}

