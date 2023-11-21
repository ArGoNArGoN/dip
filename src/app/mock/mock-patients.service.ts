import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";

import {MOCK_DELAY} from "@mock/data/mock.consts";
import {ALL_PATIENTS} from "@mock/data/mock-patients.consts";

import {Patient} from "@infrastructure-models/patient/patient.interfaces";
import {AbstractPatientsService} from "@infrastructure-services/abstract-patients.service";

@Injectable({
    providedIn: 'root',
})
export class MockPatientsService extends AbstractPatientsService {
    public getAllPatient(): Observable<Array<Patient>> {
        return of(ALL_PATIENTS).pipe(delay(MOCK_DELAY));
    }
}
