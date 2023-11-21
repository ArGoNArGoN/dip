import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";

import {LoadingModule} from "@widgets/loading/loading.module";
import {PatientsComponent} from "@pages/patients/patients.component";

import {AbstractMessageService} from "@infrastructure-services/abstract-message.service";
import {AbstractPatientsService} from "@infrastructure-services/abstract-patients.service";
import {AbstractContactsService} from "@infrastructure-services/abstract-contacts.service";

import {MockPatientsService} from "@mock/mock-patients.service";
import {MockContactsService} from "@mock/mock-contacts.service";

import {MessageService} from "@services/message.service";

const route: Routes = [
    {path: '', component: PatientsComponent}
];

@NgModule({
    declarations: [PatientsComponent],
    imports: [
        RouterModule.forChild(route),
        CommonModule,

        MatTableModule,
        LoadingModule,
    ],
    providers: [
        {provide: AbstractPatientsService, useClass: MockPatientsService},
        {provide: AbstractContactsService, useClass: MockContactsService},
        {provide: AbstractMessageService, useClass: MessageService},
    ],
})
export class PatientsModule {
}
