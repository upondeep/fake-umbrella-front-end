import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SharedModule } from '../shared/shared.module';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentBarEchartsModule } from '@covalent/echarts/bar';
import { ChartsModule } from 'ng2-charts';

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
    ChartsModule,
  ]
})
export class ChartModule { }
