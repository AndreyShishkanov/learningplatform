import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "@shared/services/auth/authentication.service";

@Component({
    selector: 'home-app',
    template: '<h3>Hello, {{name}}</h3>'
})
export class HomeComponent implements OnInit{
    public name : string;

    constructor(private authenticationService : AuthenticationService) {
    
    }
    
    ngOnInit(): void {
        this.name = this.authenticationService.currentUser ? this.authenticationService.currentUser.name : null;
    }
}
