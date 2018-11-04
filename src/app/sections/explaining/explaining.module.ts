import { NgModule } from '@angular/core';
import { ExplainingComponent } from './explaining.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './explaining.routing';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:      [ CommonModule, ReactiveFormsModule, FormsModule, routing],
    declarations: [ ExplainingComponent ]
})
export class ExplainingModule { }
