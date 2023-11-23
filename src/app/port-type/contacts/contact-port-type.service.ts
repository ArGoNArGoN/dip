import {Injectable} from "@angular/core";
import {delay} from "rxjs/operators";
import {Observable, of} from "rxjs";

import {IGetContactsRequest, IGetContactsResponse} from "@port-type/contacts/models/contacts.interfaces";

import {MOCK_DELAY} from "@mock/data/mock.consts";
import {GET_CONTACTS} from "@port-type/contacts/models/contacts.consts";


@Injectable({
    providedIn: 'root',
})
export class ContactServicePortType {
    public getContacts(request: IGetContactsRequest): Observable<IGetContactsResponse> {
        return of(GET_CONTACTS).pipe(delay(MOCK_DELAY));
    }
}
