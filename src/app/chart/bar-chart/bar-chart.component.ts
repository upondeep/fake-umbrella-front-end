import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription, from, of } from 'rxjs';
import { map, flatMap, toArray, catchError, onErrorResumeNext, tap } from 'rxjs/operators';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as _ from 'lodash';
import { postalCodeRegex } from '../../shared/form-validators/postal-code.directive';
import { WeatherCacheService } from 'src/app/services/weather-cache.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  barChartData: ChartDataSets[] = [{ data: [] }];
  barChartLabels: string[] = []
  barChartOptions: ChartOptions = { responsive: true };
  subscriptions$: Subscription = new Subscription();

  constructor(
    private weatherService: WeatherCacheService,
    private customerService: CustomerService,
    private cd: ChangeDetectorRef,
  ) { }

  generateBarChartData(customers: ICustomer[]) {
    let emplyeeNumbersData = [];
    let backgroundColors = [];
    for (let customer of customers) {
      this.barChartLabels.push(customer.name);
      emplyeeNumbersData.push(customer.number_of_employees);
      let isRainyday = !_.every(customer['weather']['list'], w => {
        return w['weather'][0]['main'] != "Rain";
      });
      backgroundColors.push(isRainyday ? 'Red' : 'Green');
    }
    this.barChartData = [{
      data: emplyeeNumbersData,
      backgroundColor: backgroundColors,
      label: 'Number of employees',
      hoverBackgroundColor: backgroundColors,
      // pointHoverBackgroundColor: 'none',
    }];
    console.log("barChartData:", this.barChartData);
  }

  ngOnInit() {
    this.subscriptions$.add(this.customerService.getAllCustomers().pipe(
      map(customerList => {
        let result = _.chain(customerList)
          .orderBy(['number_of_employees'], ['desc'])
          .slice(0, 10)
          .value();

        console.log("Sorted customers:", result);
        return result;
      }),
      flatMap((customers: ICustomer[]) => {
        console.log("customers:", customers);

        return from(customers);
      }),
      flatMap((customer: ICustomer) => {
        console.log("single customer:", customer);

        let zipCode = customer.location.match(postalCodeRegex)[0];

        return this.weatherService.getWeatherForecast(zipCode).pipe(
          catchError(err => of(err)),
          onErrorResumeNext(),
          map(res => {
            customer['weather'] = res;
            return customer;
          })
        );
      }),
      toArray(),
    ).subscribe(
      res => {
        console.log("weather service return:", res);
        this.generateBarChartData(res);
      },
      err => {

      }
    ));
    // this.weatherService.getWeatherForecast("10025").subscribe(res => {
    //   console.log("test weather:", res);
    // })
  }

  ngOnDestroy() {
    // this.subscriptions$.unsubscribe();
  }

}
