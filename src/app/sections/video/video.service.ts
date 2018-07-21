import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from "@angular/common/http";
import {Attachment} from "../../shared/classes/attachment";
import {SocketService} from "@shared/services/websockets/websocket.service";

@Injectable()
export class VideoService {
    
    constructor(private http: HttpClient, private socket : SocketService) {
    }
    
    getMedias(): Observable<Attachment[]>{
        return this.http.get<Attachment[]>('/api/getMediaList');
    }
    setCurrentMedia(attachment: Attachment): Observable<any>{
        return this.http.post("/api/setCurrentMedia", {attachment: attachment});
    }
    deleteMedia(attachment: Attachment): Observable<any>{
        return this.http.delete<Attachment>(`/api/deleteMedia/${attachment._id}`);
    }
    onPause(){
        return this.socket.on('pause');
    }
    onPlay(){
        return this.socket.on('play');
    }
    play(time){
        this.socket.emit('play', time);
    }
    pause(time){
        this.socket.emit('pause', time);
    }
    onSetTime(){
        return this.socket.on('setTime');
    }
    onRateChange(){
        return this.socket.on('rateChange');
    }
    setTime(time){
        this.socket.emit('setTime', time);
    }
    changeRate(rate){
        this.socket.emit('rateChange', rate);
    }
    onChangeMedia(){
        return this.socket.on('changeMedia');
    }
}