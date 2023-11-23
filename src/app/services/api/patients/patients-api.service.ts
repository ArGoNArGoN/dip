import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Patient} from "@infrastructure-models/patient/patient.interfaces";
import {AbstractPatientsService} from "@infrastructure-services/abstract-patients.service";

import {PatientsServicePortType} from "@port-type/patients/patients-port-type.service";
import {PatientImpl} from "@services/api/patients/models/patient-impl/patient-impl";


@Injectable({
    providedIn: 'root'
})
export class PatientsApiService extends AbstractPatientsService {
    constructor(
        private readonly patientsService: PatientsServicePortType,
    ) {
        super();
    }

    public getAllPatient(): Observable<Array<Patient>> {
        return this.patientsService.searchPatients({filters: {}}).pipe(
            map(response => response.result ?? []),
            map(result => result.map(p => new PatientImpl(p))),
        );
    }
}
