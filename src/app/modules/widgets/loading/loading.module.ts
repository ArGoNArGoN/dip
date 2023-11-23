import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from "./loading.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
    declarations: [LoadingComponent],
    imports: [CommonModule, MatProgressSpinnerModule, MatSnackBarModule],
    exports: [LoadingComponent],
})
export class LoadingModule {
}
