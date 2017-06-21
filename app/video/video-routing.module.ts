import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent }    from './video.component';
import {AuthGuard} from "../shared/service/authentication.guard";

const videoRoutes: Routes = [
    { path: 'video',  component: VideoComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [
        RouterModule.forChild(videoRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VideoRoutingModule { }