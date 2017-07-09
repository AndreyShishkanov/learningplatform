import { Component } from '@angular/core';
import { AuthenticationService } from "../shared/service/authentication.service";

@Component({
    selector: 'home-app',
    template: '<h3>Привет, {{name}}</h3>'
})
export class HomeComponent {
    public name : string;

    constructor(private authenticationService : AuthenticationService) {
        this.name = this.authenticationService.currentUser? this.authenticationService.currentUser.name : null;
    }
}