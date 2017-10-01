import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../shared/service/authentication.service";
import {User} from "../shared/classes/user";
import {Http} from "@angular/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocketService} from "../shared/service/websocket.service";
import {Subject} from "rxjs/Subject";
import {Word} from "../shared/classes/explaining";

@Component({
    selector: 'explaining',
    templateUrl: 'app/explaining/explaining.component.html',
})
export class ExplainingComponent implements OnDestroy {
    user : User;
    students : User[];
    words : Word[];
    answers : any;

    newWord: string;
    answer: string;

    form : FormGroup;

    private unsubscribe = new Subject();

    constructor(private authenticationService : AuthenticationService, private http: Http, private fb: FormBuilder, private socket : SocketService) {
        this.user = this.authenticationService.currentUser;

        this.form = this.fb.group({
            'newWord': ["", Validators.required]
        });

        this.socket.on('refreshWords').takeUntil(this.unsubscribe).subscribe((words: Word[])=>{
            this.words = words;
        });
        this.socket.on('refreshStudents').takeUntil(this.unsubscribe).subscribe((students: User[])=>{
            this.students = students;
        });
        this.socket.on('refreshAnswers').takeUntil(this.unsubscribe).subscribe((answers: User[])=>{
            this.answers = answers;
        });
    }

    onAnswerChange(answer: string) {
        this.http.post('/addAnswer', {answer:answer}).takeUntil(this.unsubscribe).subscribe(() => {});
    }

    nextWord():void{
        this.socket.emit("nextWord", null);
    }

    addWord(newWord: string):void{
        this.http.post('/addWord', {word:newWord}).takeUntil(this.unsubscribe).subscribe(() => {
            this.newWord = null;
        });
    }
    deleteWord(index: number):void{
        this.http.post('/deleteWord', {index:index}).takeUntil(this.unsubscribe).subscribe(() => {
            this.newWord = null;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}