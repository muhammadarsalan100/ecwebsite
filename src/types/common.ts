export interface SectionHeaderProps {
    titleBold: string;
    titleLight: string;
    subtitle?: string;
    showNavigation?: boolean;
    onPrevious?: () => void;
    onNext?: () => void;
}
