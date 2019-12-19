import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription, from } from 'rxjs';
import { map, flatMap, toArray } from 'rxjs/operators';
import * as _ from 'lodash';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { postalCodeRegex } from '../../shared/form-validators/postal-code.directive';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  subscriptions$: Subscription = new Subscription();

  constructor(
    private weatherService: WeatherService,
    private customerService: CustomerService,
  ) { }

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
      // flatMap((customers: ICustomer[]) => {
      //   return from(customers);
      // }),
      // flatMap((customer: ICustomer) => {
      //   let zipCode = customer.location.match(postalCodeRegex)[0];
      //   return this.weatherService.getWeatherForecast(zipCode);
      // }),
      // toArray(),
    ).subscribe(
      res => { },
      err => { }
    ));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

}
