import {Contact} from "@infrastructure-models/contact/contact.interfaces";

import {IContacts} from "@port-type/contacts/models/contacts.interfaces";

export class ContactImpl implements Contact {
    public readonly id: number;
    public readonly firstPhone: string;
    public readonly secondPhone?: string;

    constructor(contact: IContacts) {
        if (typeof contact.id !== 'number') {
            throw new Error('id contact-impl is null or undefined!');
        }

        this.id = contact.id;
        this.firstPhone = contact.first;
        this.secondPhone = contact.second;
    }
}
