import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login.component";
import { RegistrationComponent } from "./registration.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);