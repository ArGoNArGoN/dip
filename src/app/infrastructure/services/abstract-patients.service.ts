import {Observable} from "rxjs";

import {Patient} from "@infrastructure-models/patient/patient.interfaces";

export abstract class AbstractPatientsService {
    public abstract getAllPatient(): Observable<Array<Patient>>;
}
