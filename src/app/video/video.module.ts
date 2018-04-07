import { NgModule } from '@angular/core';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoComponent } from './video.component';
import { FileUploadModule } from "ng2-file-upload";
import {SharedModule} from "../shared/shared.module";
import {routing} from "./video.routing";

@NgModule({
    imports:      [ SharedModule, routing, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule, FileUploadModule,  ],
    declarations: [ VideoComponent ],
})
export class VideoModule { }
