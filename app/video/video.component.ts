import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {AuthenticationService} from "../shared/service/authentication.service";
import {Role} from "../shared/classes/user";

@Component({
    selector: 'video-app',
    templateUrl: 'app/video/video.html',
})
export class VideoComponent {
    api:VgAPI;
    socket:any;
    currentRole: Role;
    paused = true;

    constructor(private authenticationService: AuthenticationService) {
        this.socket = io();
        this.currentRole = this.authenticationService.currentUser.role;
    }

    playOrPause():void{
        this.paused? this.play() : this.pause();
    }

    play() : void{
        this.socket.emit('play', this.api.getDefaultMedia().currentTime);
    }
    pause() : void{
        this.socket.emit('pause', this.api.getDefaultMedia().currentTime);
    }

    onPlayerReady(api:VgAPI) {
        this.api = api;

        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                this.api.getDefaultMedia().currentTime = 0;
            }
        );

        let pauseObservable = new Observable(observer => {
            this.socket.on('pause', (data: any) => observer.next(data));
        });
        pauseObservable.subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.getDefaultMedia().pause();
            this.paused = true;
        });

        let playObservable = new Observable(observer => {
            this.socket.on('play', (data: any) => observer.next(data));
        });
        playObservable.subscribe((time:number)=>{
            this.api.getDefaultMedia().currentTime = time;
            this.api.getDefaultMedia().play();
            this.paused = false;
        });

        if(this.currentRole.hasControlAccess){
            this.api.getDefaultMedia().subscriptions.seeked.subscribe(
                () => {
                    this.socket.emit('setTime', this.api.getDefaultMedia().currentTime);
                }
            );
        }else{
            let setTimeObservable = new Observable(observer => {
                this.socket.on('setTime', (data: any) => observer.next(data));
            });
            setTimeObservable.subscribe((time:number)=>{
                this.api.getDefaultMedia().currentTime = time;
            });
        }
    }
}