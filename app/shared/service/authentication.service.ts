import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import IRole from "../classes/role";

@Injectable()
export class AuthenticationService {
    public token: string;
    public role: IRole;

    constructor(private http: Http, private router: Router) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.role = currentUser && currentUser.role;
    }

    login(name: string, password: string){
        this.http.post('/login', { name: name, password: password })
            .map(res => res.json())
            .subscribe( data =>  {
                // login successful if there's a jwt token in the response
                let token = data && data.token;
                if (token) {
                    // set token property
                    this.token = token;
                    this.role = data.role;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token, role: data.role }));

                    // return true to indicate successful login
                    this.router.navigate(['/']);
                } else {
                    // return false to indicate failed login
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.role = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}