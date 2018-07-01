import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User }from "../../classes/user";
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';
import {ServerResponse} from "../../classes/serverResult";
import {FormGroup} from "@angular/forms";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    private _currentUser : User;
    private _isAuthorized = new ReplaySubject<boolean>(1);
    
    get currentUser():User {
        return this._currentUser;
    }
    set currentUser(user:User) {
        this._currentUser = user;
        this._isAuthorized.next(user != null);
    }
    
    isAuthorized = this._isAuthorized.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        if(!this.currentUser) {
            this.getCurrentUser().subscribe((user: User) => {
                    this.currentUser = user;
            });
        }
    }

    login(form : FormGroup) : Observable<ServerResponse> {
            return this.http.post<ServerResponse>('/api/login', {name: form.controls['name'].value, password: form.controls['password'].value});
    }

    signUp(name: string, password: string) : Observable<ServerResponse> {
        return this.http.post<ServerResponse>('/api/signup', { name: name, password: password });
    }

    logout(): void {
        this.http.post('/api/logout', { }).subscribe(()=>{
            this.currentUser = null;
            this.router.navigate(['/auth']);
        });
    }

    getCurrentUser(): Observable<User>{
        return this.http.post<User>('/api/currentUser', { });
    }
}
