import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { LoginForm, LoginComponent } from './login.component';
import { AuthenticationService } from "../shared/service/authentication.service";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule  ],
    declarations: [ LoginForm, LoginComponent ],
    providers:    [ AuthenticationService, ],
    schemas:      [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
