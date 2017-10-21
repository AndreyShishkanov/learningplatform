import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Role} from "../shared/classes/user";
import { Http, Response } from '@angular/http';
import {ServerResponse} from "../shared/classes/serverResult";

@Component({
    templateUrl: 'logout.component.html',
    selector: 'logout',
})

export class LogoutComponent{

    constructor( private authenticationService: AuthenticationService) { }

    logout() {
        this.authenticationService.logout();
    }
}

@Component({
    templateUrl: 'login.form.html',
})

export class LoginComponent implements OnInit {

    form : FormGroup;

    constructor( private authenticationService: AuthenticationService, private fb: FormBuilder) { }

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

@Component({
    templateUrl: 'registration.form.html',
})

export class RegistrationComponent implements OnInit {

    form : FormGroup;
    roles: Role[];

    constructor( private authenticationService: AuthenticationService, private fb: FormBuilder, private http: Http) {
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
        this.http.get('/getroles').map((res : Response) => res.json())
            .subscribe( (response : Role[]) =>  {
                this.roles = response;
            });
    }
}
