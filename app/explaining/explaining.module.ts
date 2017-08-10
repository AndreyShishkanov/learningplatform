import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExplainingComponent } from './explaining.component';
import {AuthenticationService} from "../shared/service/authentication.service";

@NgModule({
    imports:      [ BrowserModule],
    declarations: [ ExplainingComponent ]
})
export class ExplainingModule { }
