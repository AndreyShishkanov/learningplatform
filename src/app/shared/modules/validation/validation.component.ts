import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'validation-messages',
    template: `<div *ngIf="this.control.touched && this.control.invalid" class="invalid-feedback">{{errorMessage}}</div>`
})
export class ValidationComponent {
    config = {
        'required': 'This field is required!'
    };
    @Input() control: FormControl;
    constructor() { }

    getValidatorErrorMessage(validatorName: string) {
        if(this.config.hasOwnProperty(validatorName)){
            return this.config[validatorName];
        }else{
            return validatorName;
        }
    }

    get errorMessage() {
        if (!this.control.errors) return null;
        return this.getValidatorErrorMessage(Object.keys(this.control.errors)[0]);
    }
}