import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription, from, of } from 'rxjs';
import { map, flatMap, toArray, catchError, onErrorResumeNext } from 'rxjs/operators';
import * as _ from 'lodash';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { postalCodeRegex } from '../../shared/form-validators/postal-code.directive';
import { WeatherCacheService } from 'src/app/services/weather-cache.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  subscriptions$: Subscription = new Subscription();

  constructor(
    private weatherService: WeatherCacheService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.subscriptions$.add(this.customerService.getAllCustomers().pipe(
      map(customerList => {
        let result = _.chain(customerList)
          .orderBy(['number_of_employees'], ['desc'])
          .slice(0, 1)
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
          onErrorResumeNext()
        );
      }),
      toArray(),
    ).subscribe(
      res => {
        console.log("weather service return:", res);
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
