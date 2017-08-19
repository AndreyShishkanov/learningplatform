import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from "../shared/service/authentication.service";
import {User} from "../shared/classes/user";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Component({
    selector: 'explaining',
    templateUrl: 'app/explaining/explaining.component.html',
})
export class ExplainingComponent {
    public user : User;
    public newWord: string;
    public words : string[];
    socket:any;

    constructor(private authenticationService : AuthenticationService, private http: Http) {
        this.socket = io();
        this.user = this.authenticationService.currentUser;
        this.getWords();

        let playObservable = new Observable(observer => {
            this.socket.on('refreshWords', (data: any) => observer.next(data));
        });
        playObservable.subscribe(()=>{
            this.getWords();
        });
    }

    getWords():void{
        this.http.get('/getWords').map(res => res.json())
            .subscribe( (words : string[]) =>  {
                this.words = words;
            });
    }
    addWord(newWord: string):void{
        this.http.post('/addWord', {word:newWord}).subscribe(() => {
            this.newWord = null;
        });
    }
    deleteWord(index: number):void{
        this.http.post('/deleteWord', {index:index}).subscribe(() => {
            this.newWord = null;
        });
    }
}