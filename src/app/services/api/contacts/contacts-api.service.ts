import {Injectable} from '@angular/core';

import {FilterHelper} from "@common/helpers/filter-helper";

import {AbstractContactsService} from "@infrastructure-services/abstract-contacts.service";
import {SetContact} from "@infrastructure-models/contact/contact.interfaces";

import {ContactImpl} from "@services/api/contacts/models/contact-impl/contact-impl";

import {ContactServicePortType} from "@port-type/contacts/contact-port-type.service";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ContactsApiService extends AbstractContactsService {
    constructor(
        private readonly contactService: ContactServicePortType,
    ) {
        super();
    }

    public setContacts<T extends SetContact>(objects: Array<T>): Observable<Array<T>> {
        if (objects.length === 0) {
            return of([]);
        }

        const contactIds: Array<number> = objects.map(o => o.contactId).filter(FilterHelper.isDefined);

        if (contactIds.length === 0) {
            return of([]);
        }

        return this.contactService.getContacts({
            filters: {contactIds}
        }).pipe(
            map(response => response.result ?? []),
            map(results => results.map(c => new ContactImpl(c))),
            tap(contacts => objects.forEach(o => o.setContact(contacts))),
            map(() => objects),
        );
    }
}
