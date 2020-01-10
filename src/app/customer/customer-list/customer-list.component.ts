import { Component, OnInit } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn, ITdDataTableSelectEvent, ITdDataTableSelectAllEvent } from '@covalent/core/data-table';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditCustomerComponent } from '../add-or-edit-customer/add-or-edit-customer.component';
import * as _ from 'lodash';
import { from, of } from 'rxjs';
import { flatMap, catchError, onErrorResumeNext, toArray } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TdDialogService } from '@covalent/core/dialogs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customersList: ICustomer[] = [];
  selectedCustomers: ICustomer[] = [];
  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Customer Name' },
    { name: 'location', label: 'Location' },
    { name: 'telephone_number', label: 'Telephone Number' },
    { name: 'person_of_contact', label: 'Person of Contact' },
    { name: 'number_of_employees', label: 'Number of Employees' },
  ];

  constructor(
    private dataTableService: TdDataTableService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: TdDialogService,
  ) { }

  ngOnInit() {
    this.refreshCustomerList();
  }

  addOrEditCustomer(editMode: boolean) {
    let dialogRef = this.dialog.open(AddOrEditCustomerComponent, {
      width: '600px',
      data: {
        customer: editMode ? this.selectedCustomers[0] : null,
      }
    });
    dialogRef.componentInstance.editMode = editMode;
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.refreshCustomerList();
    });
  }

  //#region buttons
  refreshCustomerList() {
    this.customerService.getAllCustomers().subscribe(res => {
      this.customersList = res;
      this.selectedCustomers = [];
    });
  }

  deleteCustomer() {
    this.dialogService.openConfirm({
      message: "Are you sure you want to delete slected customers?",
      title: "Delete Customers",
      width: "500px",
    }).afterClosed().pipe(
      flatMap(accept => {
        if (accept) {
          return from(this.selectedCustomers);
        }
        else return of();
      }),
      flatMap(customer => {
        let id = (customer as ICustomer).customer_id;
        if (id)
          return this.customerService.deleteCustomer(id).pipe(
            catchError(err => {
              return of(err);
            }),
            onErrorResumeNext());
      }),
      toArray(),
    ).subscribe(res => {
      if (res.length > 0) {
        for (let elem of res as any[]) {
          if (elem instanceof HttpErrorResponse) {
            this.snackBar.open(elem.message, 'Dismiss', { duration: 4000 });
          }
        }
        this.refreshCustomerList();
      }
    });
  }

  disableEditButton() {
    return this.selectedCustomers.length != 1;
  }

  disableDeleteButton() {
    return this.selectedCustomers.length == 0;
  }
  //#endregion

  //#region data-table row operation
  rowSelected(event: ITdDataTableSelectEvent) {
    if (event.selected) {
      this.addRowToSelection(event.row);
    } else {
      this.removeRowFromSelection(event.row);
    };

  }

  selectAllEvent(event: ITdDataTableSelectAllEvent) {
    _.forEach(event.rows, row => {
      if (event.selected) {
        this.addRowToSelection(row);
      } else {
        this.removeRowFromSelection(row);
      };
    })
  }

  addRowToSelection(row: any) {
    let elem = _.find(this.selectedCustomers, e => e.customer_id == row.customer_id);
    if (!elem) {
      this.selectedCustomers.push(_.clone(row));
    }
  }

  removeRowFromSelection(row: any) {
    let elem = _.find(this.selectedCustomers, e => e.customer_id == row.customer_id);
    if (elem) {
      _.pull(this.selectedCustomers, elem);
    }
  }
  //#endregion

}
