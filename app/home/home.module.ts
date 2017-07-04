import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import {AuthenticationService} from "../shared/service/authentication.service";

@NgModule({
    imports:      [ BrowserModule],
    declarations: [ HomeComponent ]
})
export class HomeModule { }
