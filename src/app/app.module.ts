import { BrowserModule } from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from './_services/authentication.service';

import { AppComponent } from './app.component';
import { InputText } from './input-text/input-text';
import { LogInComponent } from './login-form/login-form';
import { StockListComponent } from './stock-list/stock-list';
import { StockEntryComponent } from './stock-entry/stock-entry';
import { AllStocksComponent } from './all-stocks/all-stocks';

const appRoutes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', component: LogInComponent },
  { path: 'home', component: StockListComponent },
  { path: 'stockentry', component: StockEntryComponent },
  { path: 'allstocks', component: AllStocksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InputText,
    LogInComponent,
    StockListComponent,
    StockEntryComponent,
    AllStocksComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
