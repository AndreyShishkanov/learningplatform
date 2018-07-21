import { Component, OnDestroy, OnInit } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {AuthenticationService} from "@shared/services/auth/authentication.service";
import {Role} from "@shared/classes/user";
import {Attachment} from "@shared/classes/attachment";
import {Subject} from "rxjs/Subject";
import {FileUploader} from "ng2-file-upload";
import {VideoService} from "./video.service";

@Component({
    selector: 'video-app',
    templateUrl: 'video.html',
})
export class VideoComponent implements OnInit, OnDestroy{
    api:VgAPI;
    currentRole: Role;
    currentMedia: Attachment;
    attachments: Attachment[];
    paused = true;

    public uploader:FileUploader = new FileUploader({url: '/api/upload'});

    private unsubscribe = new Subject();

    constructor(public authenticationService: AuthenticationService, private videoService: VideoService) {
        this.getMedias();
        this.currentRole = this.authenticationService.currentUser.role;
    }

    ngOnInit(){
        this.uploader.onSuccessItem = (item, response, status, headers) => this.getMedias();
    }

    getMedias():void{
        this.currentMedia = null;
        this.videoService.getMedias()
            .subscribe( (attachments : Attachment[]) =>  {
                this.attachments = attachments;
                this.currentMedia = attachments.filter(x=>x.selected)[0];
            });
    }

    fileChangeEvent() {
        this.uploader.uploadAll();
    }
    
    mediaChangeEvent(attachment: Attachment) {
        if(this.currentMedia === attachment) return;
        
        this.currentMedia = null;
        
        this.videoService.setCurrentMedia(attachment).subscribe(() => {
            this.currentMedia = attachment;
        });
    }
    
    mediaDeleteEvent(attachment: Attachment) {
        if(attachment == this.currentMedia) this.currentMedia = null;
        
        this.videoService.deleteMedia(attachment).subscribe((mediafile) => {
            this.attachments.splice(this.attachments.indexOf(attachment), 1);
            if(mediafile) this.currentMedia = this.attachments.find( x => x._id == mediafile._id);
        });
    }

    playOrPause():void{
        this.paused? this.play() : this.pause();
    }

    play() : void{
        this.videoService.play(this.api.currentTime);
    }
    pause() : void{
        this.videoService.pause(this.api.currentTime);
    }

    onPlayerReady(api:VgAPI) {
        this.api = api;

        this.api.subscriptions.ended.takeUntil(this.unsubscribe).subscribe(
            () => {
                this.paused = true;
            }
        );

        this.videoService.onPause().takeUntil(this.unsubscribe).subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.pause();
            this.paused = true;
        });

        this.videoService.onPlay().takeUntil(this.unsubscribe).subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.play();
            this.paused = false;
        });

        if(this.currentRole.hasControlAccess){
            this.api.subscriptions.seeked.takeUntil(this.unsubscribe).subscribe(() => {
                    this.videoService.setTime(this.api.currentTime);
                }
            );
            this.api.subscriptions.rateChange.takeUntil(this.unsubscribe).subscribe(() => {
                    this.videoService.changeRate(this.api.playbackRate);
                }
            );
        }else{
            this.videoService.onChangeMedia().takeUntil(this.unsubscribe).subscribe(() => {
                this.getMedias();
            });
            
            this.videoService.onSetTime().takeUntil(this.unsubscribe).subscribe((time:number) => {
                this.api.currentTime = time;
            });

            this.videoService.onRateChange().takeUntil(this.unsubscribe).subscribe((playbackRate:number) => {
                this.api.playbackRate = playbackRate;
            });
        }
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
