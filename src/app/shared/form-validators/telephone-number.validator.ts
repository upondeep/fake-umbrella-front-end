import { ValidatorFn, AbstractControl } from '@angular/forms';

export function TelephoneNumberValidator(control: AbstractControl) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(control.value) ? { validPhoneNumber: true } : null;
}