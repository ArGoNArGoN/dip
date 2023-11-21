import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

import {WrapperComponent} from "@pages/wrapper/wrapper.component";

const children: Routes = [
    {path: 'patients', loadChildren: () => import('@pages/patients/patients.module').then(p => p.PatientsModule)},
    {path: '**', redirectTo: 'some-registry'},
];

const mainRouts: Routes = [
    {path: '', component: WrapperComponent, children},
];

@NgModule({
    declarations: [WrapperComponent],
    imports: [RouterModule.forChild(mainRouts), MatButtonModule],
})
export class PagesModule {
}
