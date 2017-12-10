import { Component } from '@angular/core';

@Component({
	selector: 'dashboard',
  	templateUrl: './stock-list.html',
  	styleUrls: ['./stock-list.css']
})

export class StockListComponent{
  private exchanges: any;
  private selectedExchange: number;
  private securities: any;
  private selectedSecurity: number;
  private stock: any;

  constructor(){
    this.stock = {};

    this.exchanges = [{
      id: 1,
      name: "National Stock Exchange"
    },{
      id: 2,
      name: "BSE"
    },{
      id: 3,
      name: "Newyork Stock Exchange"
    }];
    this.stock.selectedExchange = 1;

    this.securities = [{
      id: 1,
      name: "Reliance Industries"
    },{
      id: 2,
      name: "Reliance Oil"
    }];
    this.stock.selectedSecurity = 1;
  }

	private btnClickSaveStockList():void {
    console.log(this.stock);
	}
}

/*
countries = [
       {id: 1, name: "United States"},
       {id: 2, name: "Australia"},
       {id: 3, name: "Canada"},
       {id: 4, name: "Brazil"},
       {id: 5, name: "England"}
     ];
    selectedValue = null;

    countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];
  selectedValue = null;
*/