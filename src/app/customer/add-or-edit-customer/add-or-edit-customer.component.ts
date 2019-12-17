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
    return location.hasError('invalidPostalCode') ? 'Please input your location, put postal code at end.' : '';
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
      location: ['',
        // Validators.required
        [Validators.required, postalCodeValidator()]
      ],
      telephone: ['',
        // Validators.required
        [Validators.required, telephoneNumberValidator()]
      ],
      personOfContact: ['', Validators.required],
      numberOfEmployees: [0,
        // Validators.required
        [Validators.required, naturalNumberValidator()]
      ],
    });
    console.log('form', this.customerForm);
  }


}
