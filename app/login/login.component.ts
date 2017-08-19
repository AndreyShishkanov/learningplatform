import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Role} from "../shared/classes/user";
import { Http, Response } from '@angular/http';

@Component({
    templateUrl: 'app/login/logout.component.html',
    selector: 'logout',
})

export class LogoutComponent{

    constructor( private authenticationService: AuthenticationService) { }

    logout() {
        this.authenticationService.logout();
    }
}

@Component({
    templateUrl: 'app/login/login.form.html',
})

export class LoginComponent {
    constructor( private authenticationService: AuthenticationService) { }

    login(name: string, password: string) {
        this.authenticationService.login(name, password);
    }
}

@Component({
    templateUrl: 'app/login/registration.form.html',
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