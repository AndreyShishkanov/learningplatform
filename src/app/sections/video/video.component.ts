import { Component, OnDestroy, OnInit } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {AuthenticationService} from "../../shared/services/auth/authentication.service";
import {Role} from "../../shared/classes/user";
import {Attachment} from "../../shared/classes/attachment";
import { HttpClient } from '@angular/common/http';
import {FilesUploadService} from "../../shared/services/files/file-upload.service";
import {SocketService} from '../../shared/services/websockets/websocket.service';
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

    constructor(public authenticationService: AuthenticationService, private videoService: VideoService, private fileUploadService : FilesUploadService, private socket : SocketService) {
        this.getMedias();
        this.currentRole = this.authenticationService.currentUser.role;
    }

    ngOnInit(){
        this.uploader.onSuccessItem = (item, response, status, headers) => this.getMedias();
    }

    getMedias():void{
        this.currentMedia = null;
        this.videoService.getMedias()
            .subscribe( (response : Attachment[]) =>  {
                this.attachments = response;
                this.currentMedia = response.filter(x=>x.selected)[0];
            });
    }

    fileChangeEvent() {
        this.uploader.uploadAll();
    }
    mediaChangeEvent(i: number) {
        this.currentMedia = null;
        
        this.videoService.setCurrentMedia(this.attachments[i]).subscribe(() => {
            this.currentMedia = this.attachments[i];
        });
    }

    playOrPause():void{
        this.paused? this.play() : this.pause();
    }

    play() : void{
        this.socket.emit('play', this.api.currentTime);
    }
    pause() : void{
        this.socket.emit('pause', this.api.currentTime);
    }

    onPlayerReady(api:VgAPI) {
        this.api = api;

        this.api.subscriptions.ended.takeUntil(this.unsubscribe).subscribe(
            () => {
                this.paused = true;
            }
        );

        this.socket.on('pause').takeUntil(this.unsubscribe).subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.pause();
            this.paused = true;
        });

        this.socket.on('play').takeUntil(this.unsubscribe).subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.play();
            this.paused = false;
        });

        if(this.currentRole.hasControlAccess){
            this.api.subscriptions.seeked.takeUntil(this.unsubscribe).subscribe(
                () => {
                    this.socket.emit('setTime', this.api.currentTime);
                }
            );
            this.api.subscriptions.rateChange.takeUntil(this.unsubscribe).subscribe(
                () => {
                    this.socket.emit('rateChange', this.api.playbackRate);
                }
            );
        }else{
            this.socket.on('setTime').takeUntil(this.unsubscribe).subscribe((time:number)=>{
                this.api.currentTime = time;
            });

            this.socket.on('rateChange').takeUntil(this.unsubscribe).subscribe((playbackRate:number)=>{
                this.api.playbackRate = playbackRate;
            });
        }
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
