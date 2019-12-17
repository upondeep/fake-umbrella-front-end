import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable, from } from 'rxjs';
import { TelephoneNumberValidator } from '../../shared/form-validators/telephone-number.validator';
import { NaturalNumberValidator } from 'src/app/shared/form-validators/natrual-number.validator';
import { PostalCodeValidator } from 'src/app/shared/form-validators/postal-code.validator';

@Component({
  selector: 'app-add-or-edit-customer',
  templateUrl: './add-or-edit-customer.component.html',
  styleUrls: ['./add-or-edit-customer.component.scss']
})
export class AddOrEditCustomerComponent implements OnInit {

  editMode: boolean;
  customerForm: FormGroup;
  customerData: ICustomer;

  getTitle(): String {
    let literal = this.editMode ? 'Edit' : 'Add'
    return `${literal} Customer`;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  disableSave() {
    return this.customerForm.invalid;
  }

  save() {
    let json = this.customerForm.value();
    let Observable: Observable<ICustomer> = this.editMode ? this.customerService.createCustomer(json) : this.customerService.updateCustomer({ customer_id: this.customerData.customer_id, ...json });
    Observable.subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  getLocationErrorMsg() {
    let location = this.customerForm.get('location');
    return location.hasError('validPostalCode') ? 'Please input your location, put postal code at end.' : '';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrEditCustomerComponent>,
    private customerService: CustomerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public customer: ICustomer
  ) {
    if (customer) {
      this.customerData = customer;
    }
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [Validators.required, PostalCodeValidator]],
      telephone_number: ['', [Validators.required, TelephoneNumberValidator]],
      person_of_contact: ['', Validators.required],
      number_of_emplyees: [0, [Validators.required, NaturalNumberValidator]],
    });
  }


}
