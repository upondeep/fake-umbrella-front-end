import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportListComponent } from './report-list/report-list.component';
import { SharedModule } from '../shared/shared.module';
import { CovalentDataTableModule } from '@covalent/core/data-table';


@NgModule({
  declarations: [ReportListComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    CovalentDataTableModule,
    SharedModule,
  ]
})
export class ReportModule { }
