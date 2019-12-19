import { ValidatorFn, AbstractControl } from '@angular/forms';

export const postalCodeRegex = /^\d{5}-\d{4}|\d{5}$|^[A-Z]\d[A-Z] \d[A-Z]\d$/;

export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        let location = control.value;
        let postalCode = location.substr(location.lastIndexOf(',') + 1).trim();
        return postalCodeRegex.test(postalCode) ? null : { invalidPostalCode: true };
    };
}