import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDataService } from '../_services/getdata.service';
import { FilterService } from '../_services/filter.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	public fullname: string;

	constructor() {
		var userdata = JSON.parse(localStorage.getItem('currentUser'));
		this.fullname = userdata.username;
	}

	public btnClickLogout(): void {
		localStorage.removeItem('currentUser');
	}
}
