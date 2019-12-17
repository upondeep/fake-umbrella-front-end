import { ValidatorFn, AbstractControl } from '@angular/forms';

export function naturalNumberValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        return /^[1-9]\d?/.test(control.value) ? null : { invalidNatrualNumber: true };
    }
}