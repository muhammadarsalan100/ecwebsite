export interface Country {
    id: number | string;
    name: string;
    shortCode: string;
    language: string;
    flagUrl: string;
    currency: {
        name: string;
        shortCode: string;
        symbolUrl: string;
    };
    code: string;
}

export interface State {
    id: number | string;
    name: string;
    shortCode: string;
    countryId: number | string;
    code: string;
    active: boolean;
    createDate?: string;
    modifiedDate?: string | null;
}

export interface City {
    id: number | string;
    name: string;
    shortCode: string;
    stateId: number | string;
    code: string;
    active: boolean;
    createDate?: string;
    modifiedDate?: string | null;
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
