import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoComponent} from "./video.component";

const routes: Routes = [
    { path: '', component: VideoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);