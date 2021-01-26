import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription, from, of } from 'rxjs';
import { map, flatMap, catchError, toArray, onErrorResumeNext } from 'rxjs/operators';
import { ICustomer } from 'src/app/model/icustomer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { WeatherCacheService } from 'src/app/services/weather-cache.service';
import { postalCodeRegex } from 'src/app/shared/form-validators/postal-code.directive';
import * as _ from 'lodash';
import { ITdDataTableColumn } from '@covalent/core/data-table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  subscriptions$: Subscription = new Subscription();
  constructor(
    private weatherService: WeatherCacheService,
    private customerService: CustomerService,
    private cd: ChangeDetectorRef,
  ) { }

  reportList: ICustomer[] = [];
  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Customer Name' },
    // { name: 'location', label: 'Location' },
    { name: 'telephone_number', label: 'Telephone Number' },
    { name: 'person_of_contact', label: 'Person of Contact' },
    // { name: 'number_of_employees', label: 'Number of Employees' },
    { name: 'rain_time', label: 'Rain Time', width: { min: 450 } }
  ];

  generateReportData(customers: ICustomer[]) {
    console.log("customers:", customers);
    let rainyCustomers = customers.filter((customer: ICustomer) => {
      if (!customer['weather']) return false;
      for (let forecast of customer['weather']['list']) {
        if (forecast['weather'][0]['main'] == 'Rain')
          return true;
      }
      return false;
    });
    console.log("Rainy Customers:", rainyCustomers);
    rainyCustomers.forEach(customer => {
      customer['rainTimeList'] = [];
      (customer['weather']['list'] as {}[]).forEach(forecast => {
        if (forecast['weather'][0]['main'] == 'Rain') {
          customer['rainTimeList'].push(forecast);
        }
      });
    })
    rainyCustomers.forEach(customer => {
      customer['rain_time'] = customer['rainTimeList'].length == 1 ? customer['rainTimeList'][0]['dt_txt'] : `\u{1F327}	${customer['rainTimeList'][0]['dt_txt']} \u{1F4A7}	${customer['rainTimeList'][customer['rainTimeList'].length - 1]['dt_txt']}`
    })
    console.log('After concat rain time field:', rainyCustomers);
    this.reportList = rainyCustomers;
  }

  ngOnInit() {
    this.subscriptions$.add(this.customerService.getAllCustomers().pipe(
      map(customerList => {
        let result = _.chain(customerList)
          .orderBy(['number_of_employees'], ['desc'])
          .value();
        return result;
      }),
      flatMap((customers: ICustomer[]) => {
        return from(customers);
      }),
      flatMap((customer: ICustomer) => {
        let zipCode = customer.location.match(postalCodeRegex)[0];
        return this.weatherService.getWeatherForecast(zipCode).pipe(
          catchError(err => of(null)),
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
        this.generateReportData(res);
      },
      err => {
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

}
