import {Observable} from "rxjs";

import {SetContact} from "@infrastructure-models/contact/contact.interfaces";

export abstract class AbstractContactsService {
    public abstract setContacts<T extends SetContact>(objects: Array<T>): Observable<Array<T>>;
}
