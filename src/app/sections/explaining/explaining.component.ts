import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "@shared/services/auth/authentication.service";
import {User} from "@shared/classes/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocketService} from "@shared/services/websockets/websocket.service";
import {Subject} from "rxjs/Subject";
import {Word} from "@shared/classes/explaining";

@Component({
    selector: 'explaining',
    templateUrl: 'explaining.component.html',
})
export class ExplainingComponent implements OnDestroy {
    user : User;
    students : User[];
    words : Word[];
    guessedWords = Array<Word>();
    answers : any;

    newWord: string;
    answer: string;

    form: FormGroup;

    private unsubscribe = new Subject();

    constructor(public authenticationService : AuthenticationService, private fb: FormBuilder, private socket : SocketService) {
        this.user = this.authenticationService.currentUser;

        this.form = this.fb.group({
            'newWord': ["", Validators.required]
        });

        this.socket.on('refreshWords').takeUntil(this.unsubscribe).subscribe((words: Word[])=>{
            this.words = words;
            this.guessedWords = this.words.filter(x=>x.guessed);
        });
        this.socket.on('refreshStudents').takeUntil(this.unsubscribe).subscribe((students: User[])=>{
            this.students = students;
        });
        this.socket.on('refreshAnswers').takeUntil(this.unsubscribe).subscribe((answers: User[])=>{
            this.answers = answers;
        });
    }

    onAnswerChange(answer: string) {
        this.socket.emit("answer", answer);
    }

    nextWord():void{
        this.socket.emit("nextWord", null);
    }

    addWord(newWord: string):void{
        this.socket.emit("addWord", newWord);
        this.newWord = null;
    }
    deleteWord(index: number):void{
        this.socket.emit("deleteWord", index);
        this.newWord = null;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
