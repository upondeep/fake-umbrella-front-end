import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
