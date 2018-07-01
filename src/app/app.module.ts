import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { HomeModule } from "./sections/home/home.module";
import { PageNotFoundComponent } from "./not-found.component";
import { FilesUploadService } from "./shared/services/files/file-upload.service";
import { routing } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './shared/ui/header/header.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';

@NgModule({
    imports:      [ BrowserModule, CommonModule, RouterModule, HttpClientModule, HomeModule, routing],
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent, PageNotFoundComponent, HeaderComponent, SidebarComponent ],
    providers:    [ FilesUploadService ]
})
export class AppModule { }
