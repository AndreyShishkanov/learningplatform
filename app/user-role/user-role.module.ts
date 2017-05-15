import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoleComponent }   from './user-role.component';
import { HttpModule } from "@angular/http";
@NgModule({
    imports:      [ BrowserModule, HttpModule ],
    declarations: [ UserRoleComponent ]
})
export class UserRoleModule { }
