import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ValidationModule} from "../shared/modules/validation.module";
import {LogoutComponent} from "./logout.component";
import {RegistrationComponent} from "./registration.component";

@NgModule({
    imports:      [ CommonModule, ReactiveFormsModule, ValidationModule ],
    declarations: [ LoginComponent, LogoutComponent, RegistrationComponent ],
    exports:      [ LoginComponent, LogoutComponent, RegistrationComponent ]
})
export class LoginModule { }
