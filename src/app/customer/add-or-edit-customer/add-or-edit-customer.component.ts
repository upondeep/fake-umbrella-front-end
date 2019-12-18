import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable, from } from 'rxjs';
import { telephoneNumberValidator } from '../../shared/form-validators/telephone-number.directive';
import { naturalNumberValidator } from 'src/app/shared/form-validators/natrual-number.directive';
import { postalCodeValidator } from 'src/app/shared/form-validators/postal-code.directive';

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
    let word = this.editMode ? 'Edit' : 'Add'
    return `${word} Customer`;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  disableSave() {
    return this.customerForm.invalid;
  }

  save() {
    let json = this.customerForm.value;
    console.log("json", json);
    let Observable: Observable<ICustomer> = this.editMode ? this.customerService.updateCustomer({ customer_id: this.customerData.customer_id, ...json }) : this.customerService.createCustomer(json);
    Observable.subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  getLocationErrorMsg() {
    let location = this.customerForm.get('location');
    return location.hasError('invalidPostalCode') ? 'Please input your location, put postal code at end and separate with comma.' : '';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrEditCustomerComponent>,
    private customerService: CustomerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.customerData = data.customer;
    }
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [Validators.required, postalCodeValidator()]
      ],
      telephone_number: ['', [Validators.required, telephoneNumberValidator()]
      ],
      person_of_contact: ['', Validators.required],
      number_of_employees: [0, [Validators.required, naturalNumberValidator()]
      ],
    });
    console.log('form', this.customerForm);
  }

}
