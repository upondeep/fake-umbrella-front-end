import { Component, OnInit } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core/data-table';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditCustomerComponent } from '../add-or-edit-customer/add-or-edit-customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customersList: ICustomer[] = [];
  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Customer Name' },
    { name: 'location', label: 'Location' },
    { name: 'telephone_number', label: 'Telephone Number' },
    { name: 'person_of_contact', label: 'Person of Contact' },
    { name: 'number_of_employees', label: 'Number of Employees' },
  ];

  constructor(
    private dataTableService: TdDataTableService,
    private customerServkce: CustomerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.customerServkce.getAllCustomers().subscribe(res => {
      console.log("res", res);
      this.customersList = res;
    });
  }

  addOrEditCustomer(editMode: boolean) {
    let dialogRef = this.dialog.open(AddOrEditCustomerComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.editMode = editMode;
    dialogRef.afterClosed().subscribe(res => {
      console.log('result:', res);
    });
  }

  deleteCustomer() { }

}
