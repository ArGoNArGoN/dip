import {IGetContactsResponse} from "@port-type/contacts/models/contacts.interfaces";

export const GET_CONTACTS: IGetContactsResponse = {
    result: [
        {id: 10, first: '79843873271'},
        {id: 12, first: '79853531200', second: '79832131231'},
    ],
    count: 2,
};
