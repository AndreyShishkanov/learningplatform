import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root"
})
export class SocketService {
    private socket: any;
    constructor() {
        this.socket = io();
    }
    emit(action:string, data:any): void {
        this.socket.emit(action, data);
    }
    on(action:string):Observable<any> {
        return new Observable(observer => {
            this.socket.on(action, (data: any) => observer.next(data));
        });
    }
}