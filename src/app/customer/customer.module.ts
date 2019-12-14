import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddOrEditCustomerComponent } from './add-or-edit-customer/add-or-edit-customer.component';
import { CovalentDataTableModule } from '@covalent/core/data-table';


@NgModule({
  declarations: [
    CustomerListComponent,
    AddOrEditCustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CovalentDataTableModule,
  ]
})
export class CustomerModule { }
