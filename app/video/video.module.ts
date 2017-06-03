import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoComponent }   from './video.component';
import {VideoRoutingModule} from "./video-routing.module";

@NgModule({
    imports:      [ BrowserModule ,VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule, VideoRoutingModule ],
    declarations: [ VideoComponent ]
})
export class VideoModule { }
