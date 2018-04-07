import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient, private router: Router) {
        if(!this.currentUser) {
            this.getCurrentUser().subscribe((user: User) => {
                    this.currentUser = user;
            });
        }
    }

    login(form : FormGroup) {
            this.http.post<ServerResponse>('/api/login', {name: form.controls['name'].value, password: form.controls['password'].value})
                .subscribe((response) => {
                    if (response.success === true) {
                        this.currentUser = response.user;
                        this.router.navigate(['']);
                    }else{
                        form.controls[response.field].setErrors({[response.message]:true});
                    }
            });
    }

    signUp(name: string, password: string) : ServerResponse {
        this.http.post<ServerResponse>('/api/signup', { name: name, password: password })
            .subscribe( (response) =>  {
                if (response.success === true) {
                    this.currentUser = response.user;
                    this.router.navigate(['']);
                }
                return response;
            });
        return;
    }

    logout(): void {
        this.http.post('/api/logout', { }).subscribe(()=>{
            this.currentUser = null;
            this.router.navigate(['/login']);
        });
    }

    getCurrentUser(): Observable<User>{
        return this.http.post<User>('/api/currentUser', { });
    }
    isAuthorizated(): Observable<boolean>{
        if(this.currentUser){
            return Observable.of(this.currentUser != null);
        }else {
            return this.http.post<boolean>('/api/isAuthorizated', {});
        }
    }
}
