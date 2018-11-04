import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public authenticationService: AuthenticationService ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> {
        return this.authenticationService.currentUser$.pipe(map(user => {
            if (user) {
                return true;
            } else {
                this.router.navigate(['/auth']);
                return false;
            }
        }));
    }
}
