import {TestBed} from '@angular/core/testing';
import {of, throwError} from "rxjs";

import {EMPTY_METHOD} from "@mock/data/mock.consts";

import {ContactsApiService} from '@services/api/contacts/contacts-api.service';

import {SpyService} from "@common/spy/spy.interfaces";

import {SetContact} from "@infrastructure-models/contact/contact.interfaces";

import {IGetContactsResponse} from "@port-type/contacts/models/contacts.interfaces";
import {ContactServicePortType} from "@port-type/contacts/contact-port-type.service";

const CONTACT_ID = 6;
const GET_CONTACTS: IGetContactsResponse = {
    result: [{
        id: CONTACT_ID,
        first: '99999999999',
        second: '99999999999',
    }],
    count: 1,
};

describe('ContactApiService', () => {
    let service: ContactsApiService;
    let setContact: SetContact;

    /**Мок для тестирования вызова contactId: undefined*/
    const emptySetContact: SetContact = {contactId: undefined, setContact: EMPTY_METHOD};

    const fakeContactServicePortType: SpyService<ContactServicePortType, 'getContacts'> = jasmine.createSpyObj([
        'getContacts',
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ContactServicePortType, useValue: fakeContactServicePortType}
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(ContactsApiService);
    });

    beforeEach(() => {
        fakeContactServicePortType.getContacts.and.returnValue(of(GET_CONTACTS));
        setContact = {contactId: CONTACT_ID, setContact: EMPTY_METHOD};
    });

    beforeEach(() => {
        fakeContactServicePortType.getContacts.calls.reset();
    });

    it('должен быть создан', () => {
        expect(service).toBeTruthy();
    });

    it('setContacts должен вызывать getContacts сервиса ContactServicePortType', () => {
        service.setContacts([setContact]);

        expect(fakeContactServicePortType.getContacts).toHaveBeenCalled();
    });

    it('setContacts должен фильтровать пустые contactId при вызове getContacts сервиса ContactServicePortType', () => {
        fakeContactServicePortType.getContacts.and.returnValue(of(GET_CONTACTS));

        service.setContacts([setContact, emptySetContact]);

        expect(fakeContactServicePortType.getContacts).toHaveBeenCalledWith({
            filters: {contactIds: [CONTACT_ID]},
        });
    });

    it('setContacts не должен отправить запрос к сервису, если contactIds пустой', () => {
        fakeContactServicePortType.getContacts.calls.reset();

        service.setContacts([emptySetContact, emptySetContact]);

        expect(fakeContactServicePortType.getContacts).not.toHaveBeenCalled();
    });

    it('setContacts должен вызывать setContact', () => {
        const spySetContact = spyOn(setContact, 'setContact');

        service.setContacts([setContact]);

        expect(spySetContact).not.toHaveBeenCalled();
    });

    it('setContacts должен вернуть пустой массив, если results = []', done => {
        fakeContactServicePortType.getContacts.and.returnValue(of({result: [], count: 0}));

        service.setContacts([setContact]).subscribe({
            next: data => {
                expect(data).toEqual([setContact]);
                done();
            },
            error: done.fail,
        });
    });

    it('setContacts должен вернуть пустой массив, если results = undefined', done => {
        fakeContactServicePortType.getContacts.and.returnValue(of({result: undefined, count: 0}));

        service.setContacts([setContact]).subscribe({
            next: data => {
                expect(data).toEqual([setContact]);
                done();
            },
            error: done.fail,
        });
    });

    it('setContacts должен map\'нуть result в объект от Contact', done => {
        const result = GET_CONTACTS.result!;
        const spyResultMap = spyOn(result, 'map');

        fakeContactServicePortType.getContacts.and.returnValue(of({result: result, count: 1}));

        service.setContacts([setContact]).subscribe({
            next: () => {
                expect(spyResultMap).toHaveBeenCalled()
                done();
            },
            error: done.fail,
        });
    });

    it('setContacts не должен вызывать метод getContacts сервиса ContactServicePortType', () => {
        fakeContactServicePortType.getContacts.calls.reset();

        service.setContacts([]);

        expect(fakeContactServicePortType.getContacts).not.toHaveBeenCalled();
    });

    it('setContacts должен вернуть ошибку, если сервис вернул Error', done => {
        const expectError = new Error('Ошибка сервиса');

        fakeContactServicePortType.getContacts.and.returnValue(throwError(expectError));

        service.setContacts([setContact]).subscribe({
            next: () => done.fail(),
            error: error => {
                expect(error).toEqual(expectError)
                done();
            },
        });
    });
});
