import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessages } from "./validation.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ControlMessages],
    exports: [ControlMessages]
})
export class ValidationModule { }