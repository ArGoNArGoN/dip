import {SetContact} from "../infrastructure-models/contact/contact.interfaces";
import {Observable} from "rxjs";

export abstract class AbstractContactsService {
    public abstract setContacts<T extends SetContact>(objects: Array<T>): Observable<Array<T>>;
}
