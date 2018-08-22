import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "@shared/services/auth/authentication.service";

@Component({
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    
    form : FormGroup;

    constructor( public authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.form = this.fb.group({
                'name': ["", Validators.required],
                'password': ["", Validators.required]
            });
    }

    login():any {
        if(this.form.valid) this.authenticationService.login(this.form.value).subscribe((user) => {
            this.authenticationService.currentUser = user;
            this.router.navigate(['']);
        },
            (err: HttpErrorResponse) => {
                this.form.controls[err.error.field].setErrors({[err.error.message]:true});
            }
        );
    }
}