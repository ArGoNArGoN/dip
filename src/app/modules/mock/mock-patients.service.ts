import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";
import {Patient} from "../infrastructure-models/patient/patient.interfaces";
import {AbstractPatientsService} from "../infrastructure-services/abstract-patients.service";
import {MOCK_DELAY} from "./data/mock.consts";
import {ALL_PATIENTS} from "./data/mock-patients.consts";

@Injectable({
    providedIn: 'root',
})
export class MockPatientsService extends AbstractPatientsService {
    public getAllPatient(): Observable<Array<Patient>> {
        return of(ALL_PATIENTS).pipe(delay(MOCK_DELAY));
    }
}
