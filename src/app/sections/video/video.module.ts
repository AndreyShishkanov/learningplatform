import { NgModule } from '@angular/core';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoComponent } from './video.component';
import { FileUploadModule } from "ng2-file-upload";
import { routing } from "./video.routing";
import { CommonModule } from "@angular/common";
import { VideoService } from "./video.service";

@NgModule({
    imports:      [ CommonModule, routing, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule, FileUploadModule ],
    declarations: [ VideoComponent ],
    providers:    [ VideoService ]
})
export class VideoModule { }
