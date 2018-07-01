import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ValidationModule} from "../../shared/modules/validation/validation.module";
import {RegistrationComponent} from "./registration.component";
import {RouterModule} from "@angular/router";
import {routing} from "./authentication.routing";
import {DataService} from "../../shared/services/data/data.service";

@NgModule({
    imports:      [ CommonModule, RouterModule, ReactiveFormsModule, ValidationModule, routing ],
    declarations: [ LoginComponent, RegistrationComponent ],
    exports:      [ LoginComponent, RegistrationComponent ],
    providers:    [ DataService ]
})
export class AuthenticationModule { }
