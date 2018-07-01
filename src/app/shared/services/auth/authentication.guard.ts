import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from "./authentication.service";
import {Observable} from "rxjs/Observable";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public authenticationService: AuthenticationService ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | boolean {
        if(typeof(this.authenticationService.currentUser) == 'undefined') {
            return this.authenticationService.isAuthorized.map(response => {
                if (response == true) {
                    return true;
                } else {
                    this.router.navigate(['/auth']);
                    return false;
                }
            });
        }else{
            if(this.authenticationService.currentUser == null){
                this.router.navigate(['/auth']);
                return false;
            }
            return true;
        }
    }
}
