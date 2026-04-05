import { StaticImageData } from "next/image";
import { Country, State, City } from "./config";

export type { Country, State, City };

export interface TransactionData {
    amount: string;
    cardNumber: string;
    paymentMethod: string;
    date: string;
    transactionId: string;
}

export type TopUpPurpose = "mobile_money" | "bank_account";

export interface CardData {
    id: number;
    type: string;
    balance: string;
    avg: string;
    selected: boolean;
}

export interface CountrySelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (country: Country) => void;
    selectedCountry?: string;
}

export interface StateSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (state: State) => void;
    selectedState?: string;
    countryId?: number | string;
}

export interface CitySelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (city: City) => void;
    selectedCity?: string;
    stateId?: number | string;
}

export interface TransactionSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: TransactionData;
}

export interface TopUpDetailsFormProps {
    topUpType: TopUpPurpose | "";
    amount: string;
    onConfirm?: () => void;
    onEdit?: (field: string) => void;
}
