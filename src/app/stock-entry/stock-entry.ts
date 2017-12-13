import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GetDataService } from '../_services/getdata.service';
import { StockService } from '../_services/stocks.service';

@Component({
  selector: 'stock-entry',
  templateUrl: './stock-entry.html',
  styleUrls: ['./stock-entry.css']
})
export class StockEntryComponent {
	private exchanges: any;
	private selectedExchange: number;
	private securities: any;
	private selectedSecurity: number;
	private stock: any;
	private showInfoMsg: string = "";

	constructor(private getdataservice: GetDataService, private stockservice: StockService){
		this.stock = {};
		this.stock.selectedExchange = "5a2d8cda734d1d2932344c8d";
		this.stock.selectedSecurity = "5a30c4b5734d1d2932368f1b";

		this.getdataservice.getexchanges()
            .subscribe(result => {
                this.exchanges = result;
            });

    	this.getdataservice.getsecurities()
            .subscribe(result => {
                this.securities = result;
            });
	}

	private btnClickSaveStockList():void {
    	this.stock.date = new Date(this.stock.date);
    	this.stockservice.savestocks(this.stock)
    		.subscribe(result => {
                this.stock.date = "";
                this.stock.marketprice = "";
    			this.showInfoMsg = "Stock data saved successfully.";
                setTimeout(() => {
                    this.showInfoMsg = "";
                }, 4000);
    		});
	}
}
