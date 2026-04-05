import { ApiResponse } from "./auth";

export interface Address {
    customerId: number;
    type: string | number;
    countryId: number;
    stateId: number;
    cityId: number;
    label: string;
    address: string;
    building?: string;
    roomNo?: string;
    latitude?: string;
    longitude?: string;
    default: boolean;
    countryName?: string;
    stateName?: string;
    cityName?: string;
    mobileNumber: string;
    landmark?: string;
    pinCode?: string;
    id: number;
    code: string;
    active: boolean;
    createDate: string | null;
    modifiedDate: string | null;
}

export interface CreateAddressPayload {
    data: {
        type: number;
        countryId: number;
        stateId: number;
        cityId: number;
        label: string;
        address: string;
        building: string;
        roomNo: string;
        latitude: string;
        longitude: string;
        default: boolean;
        mobileNumber: string;
        landmark: string;
        pinCode: string;
    };
}

export type AddressListResponse = ApiResponse<Address[]>;
