import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExplainingComponent} from "./explaining.component";

const routes: Routes = [
    { path: '', component: ExplainingComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);