import { ValidatorFn, AbstractControl } from '@angular/forms';

export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        let location = control.value;
        console.log("PostalCodeValidator", /\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/.test(location));
        return /\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/.test(location) ? null : { invalidPostalCode: true };
    };
}