import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent }    from './video.component';

const videoRoutes: Routes = [
    { path: 'video',  component: VideoComponent }
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