import { Component } from '@angular/core';
import { AuthenticationService } from "../shared/service/authentication.service";
import {User} from "../shared/classes/user";

@Component({
    selector: 'explaining',
    templateUrl: 'app/explaining/explaining.component.html',
})
export class ExplainingComponent {
    public user : User;

    constructor(private authenticationService : AuthenticationService) {
        this.user = this.authenticationService.currentUser;
    }
}