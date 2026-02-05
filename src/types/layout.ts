export interface NavbarCountry {
    code: string;
    name: string;
    flag: any;
}

export interface RegionSelectorProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedCountry: NavbarCountry;
    setSelectedCountry: (country: NavbarCountry) => void;
    countries: NavbarCountry[];
    isMobile?: boolean;
}

export interface NavCategory {
    id: string;
    name: string;
    hasDropdown?: boolean;
}

