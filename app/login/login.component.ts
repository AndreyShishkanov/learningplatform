import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
    templateUrl: 'app/login/login.component.html',
    selector: 'login',
})

export class LoginComponent{

    constructor( private authenticationService: AuthenticationService) { }

    logout() {
        this.authenticationService.logout();
    }
}

@Component({
    templateUrl: 'app/login/login.form.html',
})

export class LoginForm {
    constructor( private authenticationService: AuthenticationService) { }

    login(name: string, password: string) {
        this.authenticationService.login(name, password);
    }
}