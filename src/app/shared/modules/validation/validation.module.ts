import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationComponent } from './validation.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ValidationComponent],
    exports: [ValidationComponent]
})
export class ValidationModule { }
