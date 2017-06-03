import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { VideoComponent } from './video/video.component';
import { VideoModule } from "./video/video.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HomeModule } from "./home/home.module";
import { LoginComponent } from "./login/login.component";
import { LoginModule } from "./login/login.module";
import { PageNotFoundComponent } from "./not-found.component";

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'video', component: VideoComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, VideoModule, HomeModule, LoginModule, RouterModule.forRoot(appRoutes)],
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent, PageNotFoundComponent ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
