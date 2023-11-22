import {Patient} from "@infrastructure-models/patient/patient.interfaces";
import {Contact} from "@infrastructure-models/contact/contact.interfaces";

import {IPatient} from "@port-type/patients/models/patients.interfaces";

export class PatientImpl implements Patient {
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly patronymic?: string;

    public readonly contactId?: number;
    public contact?: Contact;

    constructor(data: IPatient) {
        this.firstName = data.fio.firstName;
        this.lastName = data.fio.secondName;
        this.patronymic = data.fio.patronymic;

        this.contactId = data.contactId !== undefined ? +data.contactId : data.contactId;
    }

    public setContact(contacts: Array<Contact>): void {
        if (typeof this.contactId !== 'number') {
            return;
        }

        const findContact = contacts.find(c => c.id === this.contactId);

        if (findContact) {
            this.contact = findContact;
        }
    }
}
