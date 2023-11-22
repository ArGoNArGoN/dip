import {IBaseEntity} from "@port-type/base/models/port-type.interfaces";

export interface IContacts extends IBaseEntity {
    first: string;
    second?: string;
}

export interface IFiltersContacts {
    phone?: string;
    isActive?: boolean;
    contactIds?: Array<number>;
}

export interface IGetContactsRequest {
    filters: IFiltersContacts;
}

export interface IGetContactsResponse {
    result?: Array<IContacts>;
    count: number;
}
