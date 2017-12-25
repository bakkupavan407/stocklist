import { Component } from '@angular/core';

@Component({
	selector: 'dashboard',
  	templateUrl: './stock-list.html',
  	styleUrls: ['./stock-list.css']
})

export class StockListComponent{

	public fullname: string;

	constructor(){
		var userdata = JSON.parse(localStorage.getItem('currentUser'));
		this.fullname = userdata.username;
	}

	public btnClickLogout():void{
		localStorage.removeItem('currentUser');
	}
}