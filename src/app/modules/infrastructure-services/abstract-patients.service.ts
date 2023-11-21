import {Observable} from "rxjs";
import {Patient} from "../infrastructure-models/patient/patient.interfaces";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export abstract class AbstractPatientsService {
    public abstract getAllPatient(): Observable<Array<Patient>>;
}
