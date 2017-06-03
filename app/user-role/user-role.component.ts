import { Component, OnInit } from '@angular/core';
import IRole from "../shared/classes/role";
import {AuthenticationService} from "../shared/service/authentication.service";

@Component({
    selector: 'user-role',
    templateUrl: 'app/user-role/user-role.html',
    providers:[AuthenticationService]
})
export class UserRoleComponent implements OnInit {
    roles:IRole[];
    currentRole:IRole;

    constructor(private authenticationService: AuthenticationService){}

    ngOnInit () {

    }
}