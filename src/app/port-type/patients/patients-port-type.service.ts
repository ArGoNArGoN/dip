import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";


import {ISearchPatientsRequest, ISearchPatientsResponse} from "@port-type/patients/models/patients.interfaces";
import {GET_PATIENTS} from "@port-type/patients/models/patients.consts";

import {MOCK_DELAY} from "@mock/data/mock.consts";

@Injectable({
    providedIn: 'root',
})
export class PatientsServicePortType {
    public searchPatients(request: ISearchPatientsRequest): Observable<ISearchPatientsResponse> {
        return of(GET_PATIENTS).pipe(delay(MOCK_DELAY));
    }
}
