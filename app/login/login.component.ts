import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
    templateUrl: 'app/login/login.component.html',
    selector: 'login',
})

export class LoginComponent implements OnInit{
    public showLogoutButton : boolean;

    constructor( private authenticationService: AuthenticationService) { }

    ngOnInit () {
        this.showLogoutButton = this.authenticationService.token != null;
    }

    logout() {
        this.authenticationService.logout();
    }
}

@Component({
    templateUrl: 'app/login/login.form.html'
})

export class LoginForm {
    constructor( private authenticationService: AuthenticationService) { }

    login(name: string, password: string) {
        this.authenticationService.login(name, password);
    }
}