import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { VideoComponent } from './video/video.component';
import { VideoModule } from "./video/video.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HomeModule } from "./home/home.module";
import { LoginComponent, LoginForm } from "./login/login.component";
import { LoginModule } from "./login/login.module";
import { PageNotFoundComponent } from "./not-found.component";
import { AuthGuard } from './shared/service/authentication.guard';

const appRoutes: Routes =[
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginForm},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, VideoModule, HomeModule, LoginModule, RouterModule.forRoot(appRoutes)],
    bootstrap:    [ AppComponent, LoginComponent ],
    declarations: [ AppComponent, PageNotFoundComponent ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
    providers:    [ AuthGuard ]
})
export class AppModule { }
