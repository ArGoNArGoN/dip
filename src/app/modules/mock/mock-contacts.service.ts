import {Injectable} from "@angular/core";
import {MOCK_DELAY} from "./data/mock.consts";
import {delay, Observable, of} from "rxjs";
import {AbstractContactsService} from "../infrastructure-services/abstract-contacts.service";
import {SetContact} from "../infrastructure-models/contact/contact.interfaces";

@Injectable({
    providedIn: 'root',
})
export class MockContactsService extends AbstractContactsService {
    public setContacts<T extends SetContact>(objects: Array<T>): Observable<Array<T>> {
        return of(objects).pipe(delay(MOCK_DELAY));
    }
}
