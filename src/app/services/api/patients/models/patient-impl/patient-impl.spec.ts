import {PatientImpl} from '@services/api/patients/models/patient-impl/patient-impl';

import {Contact} from "@infrastructure-models/contact/contact.interfaces";

import {IPatient} from "@port-type/patients/models/patients.interfaces";
import {Patient} from "@infrastructure-models/patient/patient.interfaces";

const FULL_PATIENT: IPatient = {
    id: 1,
    contactId: '1',
    fio: {
        firstName: 'Иванов',
        secondName: 'Иван',
        patronymic: 'Иванович',
    },
};

describe('PatientImpl', () => {
    let patient: Patient;

    beforeEach(() => {
        patient = new PatientImpl(FULL_PATIENT)
    });

    it('должен быть создан', () => {
        expect(patient).toBeTruthy();
    });

    it('setContact должен сетить свой контакт', () => {
        const contactId = '9';

        patient = new PatientImpl({...FULL_PATIENT, contactId});
        const contact: Contact = {id: +contactId, firstPhone: '99999999999'};

        patient.setContact([contact]);

        expect(patient.contact).toEqual(contact);
    });

    it('setContact НЕ должен сетить чужие контакты', () => {
        patient = new PatientImpl({...FULL_PATIENT, contactId: '9',});
        const contact: Contact = {id: 90, firstPhone: '99999999999'};

        patient.setContact([contact]);

        expect(patient.contact).toBe(undefined);
    });

    it('setContact не должен искать контакт, если contactId пуст', () => {
        patient = new PatientImpl({...FULL_PATIENT, contactId: undefined});
        const contacts: Array<Contact> = [{id: 90, firstPhone: '99999999999'}];

        const spyContact = spyOn(contacts, 'find');

        patient.setContact(contacts);

        expect(spyContact).not.toHaveBeenCalled();
    });
});
