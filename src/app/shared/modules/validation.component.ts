import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'control-messages',
    template: `<div class="invalid-feedback" [hidden]="!(control.touched && control.invalid)" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessages {

    @Input() control: FormControl;
    constructor() { }

    getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'This field is required!',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };
        if(config.hasOwnProperty(validatorName)){
            return config[validatorName];
        }else{
            return validatorName;
        }
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}