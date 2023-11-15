import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PatientsComponent} from "@pages/patients/patients.component";


const route: Routes = [
    {path: '', component: PatientsComponent}
];

@NgModule({
    declarations: [PatientsComponent],
    imports: [RouterModule.forChild(route)]
})
export class PatientsModule {
}
