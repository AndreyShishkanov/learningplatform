import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./sections/home/home.component";
import { PageNotFoundComponent } from "./not-found.component";
import { AuthGuard } from '@shared/services/auth/authentication.guard';


const routes: Routes =[
    { path: 'auth', loadChildren: './sections/authentication/authentication.module#AuthenticationModule'},
    { path: 'video', loadChildren: './sections/video/video.module#VideoModule', canActivate: [AuthGuard] },
    { path: 'explaining', loadChildren: './sections/explaining/explaining.module#ExplainingModule', canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
