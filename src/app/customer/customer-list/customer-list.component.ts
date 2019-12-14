import { Component, OnInit } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core/data-table';
import { ICustomer } from 'src/app/model/icustomer.interface';

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
    { name: 'telephone', label: 'Telephone Number' },
    { name: 'contact', label: 'Person of Contact' },
    { name: 'emplyees', label: 'Number of Employees' },
  ];

  constructor(
    private dataTableService: TdDataTableService,
  ) { }

  ngOnInit() {
  }

}
