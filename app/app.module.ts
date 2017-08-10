import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { VideoModule } from "./video/video.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HomeModule } from "./home/home.module";
import { LoginComponent, LogoutComponent, RegistrationComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./not-found.component";
import { AuthGuard } from './shared/service/authentication.guard';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthenticationService } from "./shared/service/authentication.service";
import { VideoComponent } from "./video/video.component";
import { FilesUploadService } from "./shared/service/file-upload.service";
import { ReactiveFormsModule } from '@angular/forms';
import {ExplainingComponent} from "./explaining/explaining.component";
import {ExplainingModule} from "./explaining/explaining.module";


const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'video',  component: VideoComponent, canActivate: [AuthGuard] },
    { path: 'explaining',  component: ExplainingComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports:      [ BrowserModule, VideoModule, ExplainingModule, FormsModule, HttpModule, HomeModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent, PageNotFoundComponent, LoginComponent, LogoutComponent, RegistrationComponent ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
    providers:    [ AuthenticationService, AuthGuard, FilesUploadService ]
})
export class AppModule { }
