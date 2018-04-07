import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Role} from "../shared/classes/user";
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: 'registration.component.html',
})

export class RegistrationComponent implements OnInit {

    form : FormGroup;
    roles: Role[];

    constructor( public authenticationService: AuthenticationService, private fb: FormBuilder, private http: HttpClient) {
        this.getRoles();
    }

    ngOnInit() {
        this.form = this.fb.group({
                'name': ["", Validators.required],
                'password': ["", Validators.required],
                'confirmPassword': ["", Validators.required],
                'role': ["", Validators.required]
            },
            {
                validator: this.matchPassword
            });
    }

    onSubmit() {
        if(this.form.valid) this.authenticationService.signUp(this.form.controls['name'].value, this.form.controls['password'].value);
    }

    matchPassword(control: FormControl) : any {

        let password = control.get('password').value;
        let confirmPassword = control.get('confirmPassword').value;
        if(password != confirmPassword) {
            control.get('confirmPassword').setErrors( {matchPassword: true} )
        } else {
            return null
        }
    }

    getRoles(){
        this.http.get<Role[]>('/api/getroles')
            .subscribe( (response) =>  {
                this.roles = response;
            });
    }
}
