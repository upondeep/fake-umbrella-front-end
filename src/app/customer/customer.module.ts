import { NgModule } from '@angular/core';
import { CustomerRoutingModule } from './customer-routing.module';
import { CovalentDataTableModule } from '@covalent/core/data-table';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddOrEditCustomerComponent } from './add-or-edit-customer/add-or-edit-customer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerListComponent,
    AddOrEditCustomerComponent,
  ],
  imports: [
    CustomerRoutingModule,
    CovalentDataTableModule,
    SharedModule,
  ],
  entryComponents: [
    AddOrEditCustomerComponent,
  ]
})
export class CustomerModule { }
