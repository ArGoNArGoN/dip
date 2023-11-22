import {ContactImpl} from "@services/api/contacts/models/contact-impl/contact-impl";

import {Contact} from "@infrastructure-models/contact/contact.interfaces";

import {IContacts} from "@port-type/contacts/models/contacts.interfaces";

const FULL_CONTACT: IContacts = {
    id: 1,
    first: '99999999999',
    second: '99999999999',
};

describe('Contact', () => {
    it('должен быть создан', () => {
        const contact = new ContactImpl(FULL_CONTACT);

        expect(contact).toBeTruthy();
    });

    it('id не может быть пустым', () => {
        const createContact = (): Contact => new ContactImpl({
            ...FULL_CONTACT,
            id: undefined,
        });

        expect(createContact.bind(null)).toThrow(new Error('id contact-impl is null or undefined!'))
    });

    it('id не может быть отрицательным', () => {
        const contact = new ContactImpl({
            ...FULL_CONTACT,
            id: -1,
        });

        expect(contact).toBeTruthy();
    });

    it('id не может быть 0', () => {
        const contact = new ContactImpl({
            ...FULL_CONTACT,
            id: 0,
        });

        expect(contact).toBeTruthy();
    });
});
