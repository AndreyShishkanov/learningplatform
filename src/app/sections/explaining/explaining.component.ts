import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from '@shared/services/auth/authentication.service';
import {User} from '@shared/classes/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '@shared/services/websockets/websocket.service';
import {Subject} from 'rxjs/Subject';
import {Word} from '@shared/classes/explaining';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-explaining',
    templateUrl: 'explaining.component.html',
})
export class ExplainingComponent implements OnDestroy {
    students: User[];
    words: Word[];
    guessedWords = Array<Word>();
    answers: any;

    newWord: string;
    answer: string;

    form: FormGroup;

    private _onDestroy = new Subject<void>();

    constructor(public authenticationService: AuthenticationService, private fb: FormBuilder, private socket: SocketService) {
        this.form = this.fb.group({
            'newWord': ['', Validators.required]
        });

        this.socket.on('refreshWords').pipe(takeUntil(this._onDestroy)).subscribe((words: Word[]) => {
            this.words = words;
            this.guessedWords = this.words.filter(x => x.guessed);
        });
        this.socket.on('refreshStudents').pipe(takeUntil(this._onDestroy)).subscribe((students: User[]) => {
            this.students = students;
        });
        this.socket.on('refreshAnswers').pipe(takeUntil(this._onDestroy)).subscribe((answers: User[]) => {
            this.answers = answers;
        });
    }

    onAnswerChange(answer: string) {
        this.socket.emit('answer', answer);
    }

    nextWord(): void{
        this.socket.emit('nextWord', null);
    }

    addWord(newWord: string): void{
        this.socket.emit('addWord', newWord);
        this.newWord = null;
    }
    deleteWord(index: number): void{
        this.socket.emit('deleteWord', index);
        this.newWord = null;
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
