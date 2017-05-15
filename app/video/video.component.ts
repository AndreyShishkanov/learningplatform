import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Component({
    selector: 'video-app',
    templateUrl: 'app/video/video.html'
})
export class VideoComponent {
    api:VgAPI;
    private socket:any;

    constructor() {}

    onPlayerReady(api:VgAPI) {
        this.socket = io();
        this.api = api;
        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                this.api.getDefaultMedia().currentTime = 0;
            }
        );
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
            debugger;
            this.api.getDefaultMedia().currentTime = time;
        });
    }
}