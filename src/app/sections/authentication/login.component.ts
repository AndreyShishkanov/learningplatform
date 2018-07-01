import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AuthenticationService} from "../../shared/services/auth/authentication.service";
import {Router} from "@angular/router";

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
        if(this.form.valid) this.authenticationService.login(this.form).subscribe((response) => {
            if (response.success === true) {
                this.authenticationService.currentUser = response.user;
                this.router.navigate(['']);
            }else{
                this.form.controls[response.field].setErrors({[response.message]:true});
            }
        });
    }
}