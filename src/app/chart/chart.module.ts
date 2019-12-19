import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SharedModule } from '../shared/shared.module';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentBarEchartsModule } from '@covalent/echarts/bar';

@NgModule({
  declarations: [
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    CovalentBaseEchartsModule,
    CovalentBarEchartsModule,
    SharedModule,
  ]
})
export class ChartModule { }
