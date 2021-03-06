import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { IWeatherData } from '../model/iweather.interface';
import * as moment from 'moment';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherCacheService {

  private weatherData = new Map<string, IWeatherData>(); // key is zipCode

  getWeatherForecast(zipCode: string): Observable<any> {
    if (this.weatherData.has(zipCode)) {
      let cacheData = this.weatherData.get(zipCode);
      let query_time = moment(cacheData.query_time);
      let now = moment();
      if (query_time.add(3, 'h') > now) {
        return of(cacheData);
      }
    };
    return this.weatherService.getWeatherForecast(zipCode).pipe(
      tap(res => {
        res.query_time = moment().toString();
        this.weatherData.set(zipCode, res);
      }, err => console.log),
    );
  }

  constructor(private weatherService: WeatherService) { }
}
