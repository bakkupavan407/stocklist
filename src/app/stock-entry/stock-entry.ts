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
	public exchanges: any;
	private selectedExchange: number;
	public securities: any;
	private selectedSecurity: number;
	public stock: any;
	public showSuccMsg: string = "";
    public showErrorMsg: string = "";

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

	public btnClickSaveStockList():void {
    	this.stock.date = new Date(this.stock.date);
    	this.stockservice.savestocks(this.stock)
    		.subscribe(result => {
                if(result ) {
                    this.stock.date = "";
                    this.stock.marketprice = "";
                    this.showSuccMsg = "Stock data saved successfully.";
                    setTimeout(() => {
                        this.showSuccMsg = "";
                    }, 4000);
                } else {
                    this.showErrorMsg = "Connection problem. Please try again.";
                }
    		});
	}

    public btnClickCancelStockList():void {
        this.stock = {};
    }
}
