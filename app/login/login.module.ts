import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthenticationService } from "../shared/service/authentication.service";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports:      [ BrowserModule, FormsModule  ],
    declarations: [ LoginComponent ],
    providers:    [ AuthenticationService, ],
    schemas:      [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
