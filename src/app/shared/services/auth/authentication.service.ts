import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _currentUser$ = new ReplaySubject<User>(1);
    public currentUser$ = this._currentUser$.asObservable();
    public currentUser: Readonly<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.getCurrentUser().subscribe();
    }

    login(data: any): Observable<User> {
        return this.http.post<User>('/api/login', data).pipe(tap(user => this.setCurrentUser(user)));
    }

    signUp(data: any): Observable<User> {
        return this.http.post<User>('/api/signup', data).pipe(tap(user => this.setCurrentUser(user)));
    }

    logout(): void {
        this.http.post('/api/logout', { }).subscribe(() => {
            this.setCurrentUser(null);
            this.router.navigate(['/auth']);
        });
    }

    private setCurrentUser(user: User) {
        this.currentUser = user;
        this._currentUser$.next(user);
    }

    private getCurrentUser(): Observable<User> {
        return this.http.post<User>('/api/currentUser', { }).pipe(tap(user => this.setCurrentUser(user)));
    }
}
