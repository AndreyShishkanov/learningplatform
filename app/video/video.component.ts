import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import IRole from "../shared/classes/role";
import {AuthenticationService} from "../shared/service/authentication.service";

@Component({
    selector: 'video-app',
    templateUrl: 'app/video/video.html',
    providers:[AuthenticationService]
})
export class VideoComponent {
    api:VgAPI;
    socket:any;
    currentRole: IRole;

    constructor(private authenticationService: AuthenticationService) {
        this.socket = io();
    }

    onPlayerReady(api:VgAPI) {
        this.api = api;
        // this.authenticationService.currentRole.subscribe((role:IRole) => {
        //     this.currentRole = role;
        //     this.defineControls();
        // });
    }
    defineControls(){
        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                this.api.getDefaultMedia().currentTime = 0;
            }
        );
        if(!this.currentRole.hasControlsAccess){
            this.api.getDefaultMedia().subscriptions.playing.subscribe(
                () => {
                    this.socket.emit('play');
                }
            );
            this.api.getDefaultMedia().subscriptions.pause.subscribe(
                () => {
                    this.socket.emit('pause');
                }
            );
            this.api.getDefaultMedia().subscriptions.seeked.subscribe(
                () => {
                    this.socket.emit('setTime');
                }
            );
        }else{
            let pauseObservable = new Observable(observer => {
                this.socket.on('pause', (data: any) => observer.next(data));
            });
            pauseObservable.subscribe(()=>{this.api.getDefaultMedia().pause()});

            let playObservable = new Observable(observer => {
                this.socket.on('play', (data: any) => observer.next(data));
            });
            playObservable.subscribe(()=>{
                this.api.getDefaultMedia().play()
            });

            let setTimeObservable = new Observable(observer => {
                this.socket.on('setTime', (data: any) => observer.next(data));
            });
            setTimeObservable.subscribe((time:number)=>{
                this.api.getDefaultMedia().currentTime = time;
            });
        }
    }
}