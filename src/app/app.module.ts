import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material module*/
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

/* Covalent module */
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { TdDataTableService } from '@covalent/core/data-table';

/* Custom module */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    // 
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentBaseEchartsModule,
  ],
  providers: [
    // TdDataTableService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
