import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/auth/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    
    burgerOpened: boolean = false;
    
    constructor(public authenticationService: AuthenticationService) {
    }
    
    ngOnInit() {
    }
    
    openBurger(){
        this.burgerOpened = !this.burgerOpened;
    }
}
