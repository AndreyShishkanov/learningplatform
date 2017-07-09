import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User }from "../classes/user";
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';

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

    login(name: string, password: string){
        this.http.post('/login', { name: name, password: password })
            .map(res => res.json())
            .subscribe( (response : {success: boolean, message: string, user: User}) =>  {
                if (response.success === true) {
                    this.currentUser = response.user;
                    this.router.navigate(['']);
                } else {
                    alert(response.message);
                }
            });
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