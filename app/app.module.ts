import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { VideoModule } from "./video/video.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HomeModule } from "./home/home.module";
import { LoginComponent, LogoutComponent} from "./login/login.component";
import { PageNotFoundComponent } from "./not-found.component";
import { AuthGuard } from './shared/service/authentication.guard';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthenticationService } from "./shared/service/authentication.service";
import { VideoComponent } from "./video/video.component";


const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'video',  component: VideoComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports:      [ BrowserModule, VideoModule, FormsModule, HttpModule, HomeModule, RouterModule.forRoot(appRoutes)],
    bootstrap:    [ AppComponent ],
    declarations: [ AppComponent, PageNotFoundComponent, LoginComponent, LogoutComponent ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
    providers:    [ AuthenticationService, AuthGuard ]
})
export class AppModule { }
