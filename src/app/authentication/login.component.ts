import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
    templateUrl: 'login.component.html',
})

    export class LoginComponent implements OnInit {

    form : FormGroup;

    constructor( public authenticationService: AuthenticationService, private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
                'name': ["", Validators.required],
                'password': ["", Validators.required]
            });
    }

    login():any {
        if(this.form.valid) this.authenticationService.login(this.form);
    }
}