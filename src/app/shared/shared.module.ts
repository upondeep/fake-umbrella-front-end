import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CovalentCommonModule } from '@covalent/core/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentBaseEchartsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    //
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentBaseEchartsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
