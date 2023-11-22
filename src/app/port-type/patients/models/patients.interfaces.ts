export interface IBaseEntity {
    id?: number;
}

export interface IFIO {
    firstName: string;
    secondName: string;
    patronymic?: string;
}

export interface IPatient extends IBaseEntity {
    fio: IFIO;
    contactId?: string;
}

export interface ISearchPatientsRequest {
    filters: {};
}

export interface ISearchPatientsResponse {
    result?: Array<IPatient>;
    count: number;
}
