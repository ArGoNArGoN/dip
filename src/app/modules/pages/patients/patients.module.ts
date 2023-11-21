import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";

import {PatientsComponent} from "@pages/patients/patients.component";
import {AbstractPatientsService} from "../../infrastructure-services/abstract-patients.service";
import {MockPatientsService} from "../../mock/mock-patients.service";
import {AbstractContactsService} from "../../infrastructure-services/abstract-contacts.service";
import {MockContactsService} from "../../mock/mock-contacts.service";
import {AbstractMessageService} from "../../infrastructure-services/abstract-message.service";
import {MessageService} from "../../services/message.service";
import {LoadingModule} from "../../widgets/loading/loading.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../../../app-routing.module";


const route: Routes = [
    {path: '', component: PatientsComponent}
];

@NgModule({
    declarations: [PatientsComponent],
    imports: [
        RouterModule.forChild(route),
        CommonModule,

        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,

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
