import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '@shared/services/data/data.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: 'registration.component.html',
})

export class RegistrationComponent implements OnInit {

    form: FormGroup;
    roles = this.dataService.getRoles();

    constructor(
        public authenticationService: AuthenticationService,
        private dataService: DataService,
        private fb: FormBuilder,
        private router: Router)
    {
    }

    ngOnInit() {
        this.form = this.fb.group({
                'name': ['', Validators.required],
                'password': ['', Validators.required],
                'confirmPassword': ['', Validators.required],
                'role': ['', Validators.required]
            },
            {
                validator: this.matchPassword
            });
    }

    onSubmit() {
        if (this.form.valid) {
            this.authenticationService.signUp(this.form.value).subscribe( (user) =>  {
                this.router.navigate(['']);
            },
                (err: HttpErrorResponse) => {
                    this.form.controls[err.error.field].setErrors({[err.error.message]: true});
                }
            );
        }
    }

    matchPassword(control: FormControl): any {
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmPassword').value;
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors( {matchPassword: true} );
        } else {
            return null;
        }
    }
}
