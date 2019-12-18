import { ValidatorFn, AbstractControl } from '@angular/forms';

export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        let location = control.value;
        let postalCode = location.substr(location.lastIndexOf(',') + 1).trim();
        return /^\d{5}-\d{4}|\d{5}$|^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(postalCode) ? null : { invalidPostalCode: true };
    };
}