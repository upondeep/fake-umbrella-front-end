import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = "f38f2a4699ab45d9eaf15e4d3fcafd2c";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  getWeatherForecast(zipCode: string) {
    console.log("Calling api with zipCode:", zipCode);
    let countryCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(zipCode) ? 'ca' : 'us';
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&appid=${apiKey}`);
    // https://crossorigin.me/
  }

  constructor(private http: HttpClient) { }
}
