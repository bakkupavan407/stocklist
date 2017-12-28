import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatepickerOptions } from 'ng2-datepicker/bundles/ng2-datepicker.umd';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';

import { GetDataService } from '../_services/getdata.service';
import { StockService } from '../_services/stocks.service';

@Component({
  selector: 'stock-entry',
  templateUrl: './stock-entry.html',
  styleUrls: ['./stock-entry.css']
})
export class StockEntryComponent {
	public exchanges: any;
	private selectedExchange: number;
	public securities: any;
	private selectedSecurity: number;
	public stock: any;
	public showSuccMsg: string = "";
    public showErrorMsg: string = "";

    options: DatepickerOptions = {
        displayFormat: 'DD/MM/YYYY'
    };

	constructor(private getdataservice: GetDataService, private stockservice: StockService, private router: Router){
		this.stock = {};
        this.stock.date = new Date();
		this.stock.selectedExchange = 1; //"5a2d8cda734d1d2932344c8d";
		this.stock.selectedSecurity = 1; //"5a30c4b5734d1d2932368f1b";

		this.getdataservice.getexchanges()
            .subscribe(result => {
                if(result) {
                    result.unshift({
                        _id: 1,
                        name: "Select Exchange"
                    });
                    this.exchanges = result;
                } else {
                    // this.router.navigate(['/login']);
                    window.location.href = "/login";
                }
            });

    	this.getdataservice.getsecurities()
            .subscribe(result => {
                if(result) {
                    result.unshift({
                        _id: 1,
                        securityname: "Select Security"
                    });
                    this.securities = result;
                } else {
                    window.location.href = "/login";
                }
            });
	}

	public btnClickSaveStockList():void {
        var stockdate = new Date(this.stock.date);
        this.stock.date = stockdate.getFullYear() + "/" + ( stockdate.getMonth() + 1) + "/" + stockdate.getDate();
        if(this.stock.date && this.stock.marketprice && (this.stock.selectedExchange !== 1) && (this.stock.selectedSecurity !== 1)) {
            this.stock.marketprice = +(this.stock.marketprice);
            // this.stock.date = this.stock.date.split("-").join("/");
            this.stockservice.savestocks(this.stock)
            .subscribe(result => {
                if(result ) {
                    this.stock.date = "";
                    this.stock.selectedExchange = 1;
                    this.stock.selectedSecurity = 1;
                    this.stock.marketprice = "";
                    this.showSuccMsg = "Stock data saved successfully.";
                    setTimeout(() => {
                        this.showSuccMsg = "";
                    }, 4000);
                } else {
                    this.showErrorMsg = "Connection problem. Please try again.";
                }
            });
        } else {
            this.showErrorMsg = "All fields below are required.";
        }
     
	}

    public btnClickCancelStockList():void {
        this.stock.date = "";
        this.stock.selectedExchange = 1;
        this.stock.selectedSecurity = 1;
        this.stock.marketprice = "";
    }
}
