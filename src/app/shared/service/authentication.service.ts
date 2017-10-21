import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User }from "../classes/user";
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';
import {ServerResponse} from "../classes/serverResult";
import {FormGroup} from "@angular/forms";

@Injectable()
export class AuthenticationService {
    currentUser : User;

    constructor(private http: Http, private router: Router) {
        if(!this.currentUser) {
            this.getCurrentUser().subscribe((user: User) => {
                    this.currentUser = user;
            });
        }
    }

    login(form : FormGroup) {
            this.http.post('/login', {name: form.controls['name'].value, password: form.controls['password'].value})
                .map(res => res.json())
                .subscribe((response: ServerResponse) => {
                    if (response.success === true) {
                        this.currentUser = response.user;
                        this.router.navigate(['']);
                    }else{
                        form.controls[response.field].setErrors({[response.message]:true});
                    }
            });
    }

    signUp(name: string, password: string) : ServerResponse {
        this.http.post('/signup', { name: name, password: password })
            .map(res => res.json())
            .subscribe( (response : ServerResponse) =>  {
                if (response.success === true) {
                    this.currentUser = response.user;
                    this.router.navigate(['']);
                }
                return response;
            });
        return;
    }

    logout(): void {
        this.http.post('/logout', { }).subscribe(()=>{
            this.currentUser = null;
            this.router.navigate(['/login']);
        });
    }

    getCurrentUser(): Observable<User>{
        return this.http.post('/currentUser', { }).map(
            (res : Response) => {
                return res.text() ? res.json() : null;
            });
    }
    isAuthorizated(): Observable<boolean>{
        if(this.currentUser){
            return Observable.of(this.currentUser != null);
        }else {
            return this.http.post('/isAuthorizated', {}).map(
                (res: Response) => {
                    return res.json();
                });
        }
    }
}
