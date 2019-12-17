import { AbstractControl } from '@angular/forms';

export function PostalCodeValidator(control: AbstractControl) {
    let location = control.value;
    return /\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/.test(location) ? { validPostalCode: true } : null;
}