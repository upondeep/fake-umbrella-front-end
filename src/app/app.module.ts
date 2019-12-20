import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WeatherInMemoryService } from 'src/in-mem/weather-in-memory.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(WeatherInMemoryService, { passThruUnknownUrl: true }), // always import after HttpClientModule
  ],
  providers: [
    // TdDataTableService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
