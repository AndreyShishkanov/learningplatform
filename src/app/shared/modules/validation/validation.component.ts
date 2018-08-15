import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'validation-messages',
    template: `<div *ngIf="this.formControl.touched && this.formControl.invalid" class="invalid-feedback">{{errorMessage}}</div>`
})
export class ValidationComponent {
    config = {
        'required': 'This field is required!'
    };
    @Input()
    set control(value: FormControl) {
        this.formControl = value;
        this.formControl.statusChanges.subscribe(() => {
            if (this.formControl.errors){
                this.errorMessage = this.getValidatorErrorMessage(Object.keys(this.formControl.errors)[0]);
            }
        });
    }
    
    formControl: FormControl;
    
    errorMessage: string;
    
    constructor() { }
    
    getValidatorErrorMessage(validatorName: string) {
        if (this.config.hasOwnProperty(validatorName)){
            return this.config[validatorName];
        }else{
            return validatorName;
        }
    }
}