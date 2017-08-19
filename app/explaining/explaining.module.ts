import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExplainingComponent } from './explaining.component';
import { FormsModule } from '@angular/forms';
import {AuthenticationService} from "../shared/service/authentication.service";

@NgModule({
    imports:      [ BrowserModule, FormsModule],
    declarations: [ ExplainingComponent ]
})
export class ExplainingModule { }
