import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { PageNotFoundComponent } from "./not-found.component";
import { FilesUploadService } from "./shared/service/file-upload.service";
import { routing } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./authentication/login.module";

@NgModule({
    imports:      [ BrowserModule, HttpClientModule, HomeModule, LoginModule, SharedModule.forRoot(), routing],
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent, PageNotFoundComponent ],
    providers:    [ FilesUploadService ]
})
export class AppModule { }
