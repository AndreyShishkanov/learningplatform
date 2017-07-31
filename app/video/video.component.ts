import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {AuthenticationService} from "../shared/service/authentication.service";
import {Role} from "../shared/classes/user";
import {Attachment} from "../shared/classes/attachment";
import {Http} from "@angular/http";
import {FilesUploadService} from "../shared/service/file-upload.service";
import {Router} from "@angular/router";

@Component({
    selector: 'video-app',
    templateUrl: 'app/video/video.html',
})
export class VideoComponent {
    api:VgAPI;
    socket:any;
    currentRole: Role;
    currentMedia: Attachment;
    attachments: Attachment[];
    paused = true;

    constructor(private authenticationService: AuthenticationService,private fileUploadService : FilesUploadService, private http: Http, private router: Router) {
        this.getMedias();
        this.socket = io();
        this.currentRole = this.authenticationService.currentUser.role;
    }
    getMedias():void{
        this.http.post('/getMediaList', {}).map(res => res.json())
            .subscribe( (response : Attachment[]) =>  {
                this.attachments = response;
                this.currentMedia = response.filter(x=>x.selected)[0];
            });
    }

    fileChangeEvent(file: File[]) {
        this.fileUploadService.upload("/upload",file).subscribe(result => {
            this.getMedias();
            alert(result);
        });
    }
    mediaChangeEvent(i: number) {
        this.currentMedia = this.attachments[i];
        this.http.post("/setCurrentMedia", {attachment: this.attachments[i]}).subscribe(() => {

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

        this.api.subscriptions.ended.subscribe(
            () => {
                this.paused = true;
            }
        );

        let pauseObservable = new Observable(observer => {
            this.socket.on('pause', (data: any) => observer.next(data));
        });
        pauseObservable.subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.pause();
            this.paused = true;
        });

        let playObservable = new Observable(observer => {
            this.socket.on('play', (data: any) => observer.next(data));
        });
        playObservable.subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.play();
            this.paused = false;
        });

        if(this.currentRole.hasControlAccess){
            this.api.subscriptions.seeked.subscribe(
                () => {
                    this.socket.emit('setTime', this.api.currentTime);
                }
            );
            this.api.subscriptions.rateChange.subscribe(
                () => {
                    this.socket.emit('rateChange', this.api.playbackRate);
                }
            );
        }else{
            let setTimeObservable = new Observable(observer => {
                this.socket.on('setTime', (data: any) => observer.next(data));
            });
            setTimeObservable.subscribe((time:number)=>{
                this.api.currentTime = time;
            });

            let rateChangeObservable = new Observable(observer => {
                this.socket.on('rateChange', (data: any) => observer.next(data));
            });
            rateChangeObservable.subscribe((playbackRate:number)=>{
                this.api.playbackRate = playbackRate;
            });
        }
    }
}