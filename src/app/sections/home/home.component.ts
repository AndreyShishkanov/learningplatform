import { Component } from '@angular/core';
import { AuthenticationService } from "../../shared/services/auth/authentication.service";

@Component({
    selector: 'home-app',
    template: '<h3>Hello, {{name}}</h3>'
})
export class HomeComponent {
    public name : string;

    constructor(public authenticationService : AuthenticationService) {
        this.name = this.authenticationService.currentUser? this.authenticationService.currentUser.name : null;
    }
}
