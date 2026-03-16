/**
 * Shared configuration types used across the app,
 * including countries, states, cities, and currencies.
 */

export interface Country {
    id: number;
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
    id: number;
    name: string;
    shortCode: string;
    countryId: number;
    code: string;
    active: boolean;
    createDate?: string;
    modifiedDate?: string | null;
}

export interface City {
    id: number;
    name: string;
    shortCode: string;
    stateId: number;
    code: string;
    active: boolean;
    createDate?: string;
    modifiedDate?: string | null;
}

export interface Currency {
    id: number;
    name: string;
    shortCode: string;
    symbolUrl: string | null;
    code: string;
}
