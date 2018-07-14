import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Role} from "@shared/classes/user";
import {Router} from "@angular/router";
import {DataService} from "@shared/services/data/data.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    templateUrl: 'registration.component.html',
})

export class RegistrationComponent implements OnInit {

    form : FormGroup;
    roles: Role[];

    constructor( public authenticationService: AuthenticationService, private dataService: DataService, private fb: FormBuilder, private router: Router) {
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
        if(this.form.valid){
            this.authenticationService.signUp(this.form.controls['name'].value, this.form.controls['password'].value).subscribe( (user) =>  {
                this.authenticationService.currentUser = user;
                this.router.navigate(['']);
            },
                (err: HttpErrorResponse) => {
                    this.form.controls[err.error.field].setErrors({[err.error.message]:true});
                }
            );
        }
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
        this.dataService.getRoles()
            .subscribe( roles =>  {
                this.roles = roles;
            });
    }
}
