import { Component } from '@angular/core';

@Component({
	selector: 'dashboard',
  	templateUrl: './stock-list.html',
  	styleUrls: ['./stock-list.css']
})

export class StockListComponent{
  private btnClickLogout():void{
    localStorage.removeItem('currentUser');
  }
}