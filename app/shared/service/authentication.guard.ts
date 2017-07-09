import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from "./authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  :  Observable<boolean> {
        return this.authenticationService.isAuthorizated().map( response =>  {
            if (response == true) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
}