import { BrowserModule } from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AgGridModule }  from "ag-grid-angular";

import { AuthenticationService } from './_services/authentication.service';
import { GetDataService } from './_services/getdata.service';
import { StockService } from './_services/stocks.service';
import { FilterService } from './_services/filter.service';

import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { InputText } from './input-text/input-text';
import { LogInComponent } from './login-form/login-form';
import { StockListComponent } from './stock-list/stock-list';
import { StockEntryComponent } from './stock-entry/stock-entry';
import { AllStocksComponent } from './all-stocks/all-stocks';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiltersComponent } from './filters/filters.component';

const appRoutes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegistrationFormComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'filters', pathMatch: 'full' },
      { path: 'filters', component: FiltersComponent }
    ]
  },

  { path: '', component: LogInComponent },
  { 
    path: 'home', 
    component: StockListComponent,
    children: [
      { path: '', redirectTo: 'stockentry', pathMatch: 'full' },
      { path: 'stockentry', component: StockEntryComponent },
      { path: 'allstocks', component: AllStocksComponent },
      { path: 'filters', component: FiltersComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InputText,
    LogInComponent,
    StockListComponent,
    StockEntryComponent,
    AllStocksComponent,
    RegistrationFormComponent,
    DashboardComponent,
    FiltersComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ChartsModule,
    AgGridModule.withComponents([ ]),
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [AuthenticationService, GetDataService, StockService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
