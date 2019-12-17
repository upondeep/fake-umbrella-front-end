import { AbstractControl } from '@angular/forms';

export function NaturalNumberValidator(control: AbstractControl) {
    return /^[1-9]\d?/.test(control.value) ? { natrualNumber: true } : null;
}