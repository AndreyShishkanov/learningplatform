import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VideoComponent }   from './video/video.component';
import { VideoModule } from "./video/video.module";
import { UserRoleModule } from "./user-role/user-role.module";
import { UserRoleComponent } from "./user-role/user-role.component";
@NgModule({
    imports:      [ BrowserModule, VideoModule, UserRoleModule ],
    bootstrap:    [ VideoComponent, UserRoleComponent ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
