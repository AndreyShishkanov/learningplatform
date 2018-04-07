import {Component} from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
    templateUrl: 'logout.component.html',
    selector: 'logout',
})

export class LogoutComponent{

    constructor( public authenticationService: AuthenticationService) { }

    logout() {
        this.authenticationService.logout();
    }
}


