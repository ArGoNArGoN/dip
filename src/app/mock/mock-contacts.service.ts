import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";

import {MOCK_DELAY} from "@mock/data/mock.consts";

import {AbstractContactsService} from "@infrastructure-services/abstract-contacts.service";
import {SetContact} from "@infrastructure-models/contact/contact.interfaces";

@Injectable({
    providedIn: 'root',
})
export class MockContactsService extends AbstractContactsService {
    public setContacts<T extends SetContact>(objects: Array<T>): Observable<Array<T>> {
        return of(objects).pipe(delay(MOCK_DELAY));
    }
}
