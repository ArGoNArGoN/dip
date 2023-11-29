import {TestBed} from '@angular/core/testing';
import {of, throwError} from "rxjs";

import {SpyService} from "@common/spy/spy.interfaces";

import {PatientsServicePortType} from "@port-type/patients/patients-port-type.service";
import {ISearchPatientsResponse} from "@port-type/patients/models/patients.interfaces";

import {PatientsApiService} from '@services/api/patients/patients-api.service';

const SEARCH_PATIENTS: ISearchPatientsResponse = {
    result: [{
        fio: {
            secondName: 'Иванов',
            firstName: 'Иван',
            patronymic: 'Иванович',
        },
        contactId: '1',
    }],
    count: 1,
};

describe('PatientsApiService', () => {
    let service: PatientsApiService;

    const fakePatientServicePortType: SpyService<PatientsServicePortType, 'searchPatients'> = jasmine.createSpyObj([
        'searchPatients',
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: PatientsServicePortType, useValue: fakePatientServicePortType}
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(PatientsApiService);
    });

    beforeEach(() => {
        fakePatientServicePortType.searchPatients.and.returnValue(of(SEARCH_PATIENTS));
    });

    it('должен быть создан', () => {
        expect(service).toBeTruthy();
    });

    it('getAllPatient должен вызывать searchPatients сервиса PatientsServicePortType', () => {
        service.getAllPatient();

        expect(fakePatientServicePortType.searchPatients).toHaveBeenCalledWith({filters: {}});
    });

    it('getAllPatient должен возвращать [], если result = undefined', done => {
        fakePatientServicePortType.searchPatients.and.returnValue(of<ISearchPatientsResponse>({count: 0}));

        service.getAllPatient().subscribe({
            next: emptyArray => {
                expect(emptyArray).toEqual([]);
                done();
            },
            error: done.fail,
        });
    });

    it('getAllPatient должен возвращать [], если result = []', done => {
        fakePatientServicePortType.searchPatients.and.returnValue(of<ISearchPatientsResponse>({
            result: [],
            count: 0
        }));

        service.getAllPatient().subscribe({
            next: emptyArray => {
                expect(emptyArray).toEqual([]);
                done();
            },
            error: done.fail,
        });
    });

    it('getAllPatient должен вернуть ошибку, если сервис вернул Error', done => {
        const expectError = new Error('Ошибка сервиса');

        fakePatientServicePortType.searchPatients.and.returnValue(throwError(expectError));

        service.getAllPatient().subscribe({
            next: () => done.fail(),
            error: error => {
                expect(error).toEqual(expectError);
                done();
            },
        });
    });

    it('getAllPatient должен список элементов', done => {
        service.getAllPatient().subscribe({
            next: array => {
                expect(array.length).toBe(SEARCH_PATIENTS.result!.length);
                done();
            },
            error: done.fail,
        });
    });
});
