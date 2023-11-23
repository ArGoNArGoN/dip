import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy"
import {BehaviorSubject} from "rxjs";
import {finalize} from "rxjs/operators";

import {AbstractContactsService} from "@infrastructure-services/abstract-contacts.service";
import {AbstractPatientsService} from "@infrastructure-services/abstract-patients.service";
import {Patient} from "@infrastructure-models/patient/patient.interfaces";

import {PATIENT_COLUMNS} from "@pages/patients/models/patients.consts";
import {AbstractMessageService} from "@infrastructure-services/abstract-message.service";

@UntilDestroy()
@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent implements OnInit {
    public readonly columns = PATIENT_COLUMNS;

    public readonly rows$ = new BehaviorSubject<Array<Patient>>([]);
    public readonly preloaderGrid$ = new BehaviorSubject<boolean>(false);
    public readonly preloaderContacts$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly contactService: AbstractContactsService,
        private readonly patientService: AbstractPatientsService,
        private readonly messageService: AbstractMessageService,
    ) {
    }

    public ngOnInit(): void {
        this.getRows();
    }

    private getRows(): void {
        this.preloaderGrid$.next(true);

        this.patientService.getAllPatient().pipe(
            finalize(() => this.preloaderGrid$.next(false)),
            untilDestroyed(this),
        ).subscribe({
            next: rows => {
                this.rows$.next(rows);
                this.setContacts(rows);
            },
            error: error => this.messageService.error({title: 'Ошибка!', message: error}),
        });
    }

    private setContacts(rows: Array<Patient>): void {
        this.preloaderContacts$.next(true);

        this.contactService.setContacts(rows).pipe(
            finalize(() => this.preloaderContacts$.next(false)),
            untilDestroyed(this),
        ).subscribe({
            next: rows => this.rows$.next(rows),
            error: error => this.messageService.error({title: 'Ошибка!', message: error}),
        });
    }
}
