import { Component, OnDestroy } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {AuthenticationService} from "../shared/service/authentication.service";
import {Role} from "../shared/classes/user";
import {Attachment} from "../shared/classes/attachment";
import { HttpClient } from '@angular/common/http';
import {FilesUploadService} from "../shared/service/file-upload.service";
import {SocketService} from '../shared/service/websocket.service';
import {Subject} from "rxjs/Subject";
import {FileUploader} from "ng2-file-upload";

@Component({
    selector: 'video-app',
    templateUrl: 'video.html',
})
export class VideoComponent implements OnDestroy{
    api:VgAPI;
    currentRole: Role;
    currentMedia: Attachment;
    attachments: Attachment[];
    paused = true;

    public uploader:FileUploader = new FileUploader({url: '/api/upload'});

    private unsubscribe = new Subject();

    constructor(public authenticationService: AuthenticationService, private fileUploadService : FilesUploadService, private http: HttpClient, private socket : SocketService) {
        this.getMedias();
        this.currentRole = this.authenticationService.currentUser.role;
    }
    getMedias():void{
        this.http.post('/api/getMediaList', {})
            .subscribe( (response : Attachment[]) =>  {
                this.attachments = response;
                this.currentMedia = response.filter(x=>x.selected)[0];
            });
    }

    fileChangeEvent() {
        this.uploader.uploadAll();
    }
    mediaChangeEvent(i: number) {
        this.currentMedia = this.attachments[i];
        this.http.post("/api/setCurrentMedia", {attachment: this.attachments[i]}).takeUntil(this.unsubscribe).subscribe(() => {});
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
