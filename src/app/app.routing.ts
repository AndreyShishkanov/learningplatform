import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./not-found.component";
import { AuthGuard } from './shared/service/authentication.guard';
import {LoginComponent} from "./authentication/login.component";
import {RegistrationComponent} from "./authentication/registration.component";


const routes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'video',  loadChildren: './video/video.module#VideoModule', canActivate: [AuthGuard] },
    { path: 'explaining',  loadChildren: './explaining/explaining.module#ExplainingModule', canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
