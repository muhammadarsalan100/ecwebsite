export interface SectionHeaderProps {
    titleBold?: string;
    titleLight?: string;
    titleFull?: string;
    subtitle?: string;
    showNavigation?: boolean;
    onPrevious?: () => void;
    onNext?: () => void;
    variant?: "serif" | "poppins";
    className?: string;
}
