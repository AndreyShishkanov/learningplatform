import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { User }from "../classes/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {
    currentUser : User;

    constructor(private http: Http, private router: Router) {
        if(!this.currentUser) {
            this.getCurrentUser().subscribe((user : User) =>  {
                this.currentUser = user;
                this.router.navigate(['/']);
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
            this.router.navigate(['/login']);
        });
    }

    getCurrentUser(): Observable<User>{
        return this.http.post('/currentUser', { }).map(res => res.json());
    }
}