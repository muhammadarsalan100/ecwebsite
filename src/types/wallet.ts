export interface Country {
    name: string;
    code: string;
}

export interface TransactionData {
    amount: string;
    cardNumber: string;
    paymentMethod: string;
    date: string;
    transactionId: string;
}

export type TopUpPurpose = "agent" | "branch" | "go_agent";

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
