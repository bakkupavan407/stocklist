import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDataService } from '../_services/getdata.service';
import { FilterService } from '../_services/filter.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
	
	public filter: any;
	public exchanges: any;
	public securities: any;
	private selectedExchange: string;
	private selectedSecurity: string;
	public filterDates = [];
	public filterPrice = [];
	public loadChart = false;
	public weluser: any;

	public ds = [];
	public ps = [];

	public lineChartData;
	public lineChartLabels;
	public lineChartOptions;
	public lineChartColors;
	public lineChartLegend;
	public lineChartType;

	constructor(private getdataservice: GetDataService, private filterservice: FilterService) {
		this.weluser = "Bakku";
		this.filter = {};
		this.filter.selectedExchange = "5a2d8cda734d1d2932344c8d";
		this.filter.selectedSecurity = "5a30c4b5734d1d2932368f1b";
		// this.exchanges = [{"_id":"5a2d8cda734d1d2932344c8d","id":"1","name":"Bombay Stock Exchange","userid":"5a2d511b734d1d29323436de"},{"_id":"5a2d8d39734d1d2932344cad","id":"2","name":"National Stock Exchange","userid":"5a2d511b734d1d29323436de"}];
		// this.securities = [{"_id":"5a30c4b5734d1d2932368f1b","securityname":"Reliance Industries","userid":"5a2d511b734d1d29323436de"},{"_id":"5a30c51a734d1d2932369022","securityname":"TATA Industries","userid":"5a2d511b734d1d29323436de"},{"_id":"5a30c65f734d1d29323692d4","securityname":"Steels Industries","userid":"5a2d511b734d1d29323436de"},{"_id":"5a30c7f8734d1d2932369385","securityname":"TATA Power","userid":"5a2d511b734d1d29323436de"}];
		this.getdataservice.getuserexchanges()
            .subscribe(result => {
                this.exchanges = result;
            });

    	this.getdataservice.getusersecurities()
            .subscribe(result => {
                this.securities = result;
            });

        this.filterservice.getfilterdata({fromdate: "2017-12-01", todate: "2017-12-20"})
			.subscribe(result => {
				result.forEach(item=> {
					let price = item.marketprice;
					let mydate = new Date(item.date);
		   			item.date = mydate.getFullYear() + "-" + ( mydate.getMonth() + 1) + "-" + mydate.getDate();
                  	this.filterDates.push(item.date);
                  	this.filterPrice.push(item.marketprice);
                });
                this.lineChartData = [
					{data: this.filterPrice, label: ''},
				];
				this.lineChartLabels = this.filterDates;
				this.loadChartOptions();
				this.loadChart = true;
			});
	}

	ngOnInit() {
		
	}

	public btnFilterGo(): void {
		this.lineChartData = [];
		this.lineChartLabels = [];
		this.chart.chart.config.data.labels = [];

		this.ds = [];
		this.ps = [];

		this.filterservice.getfilterdata(this.filter)
			.subscribe(result => {
				result.forEach(item=> {
					let price = item.marketprice;
					let mydate = new Date(item.date);
		            item.date = mydate.getFullYear() + "-" + ( mydate.getMonth() + 1) + "-" + mydate.getDate();
                  	this.ds.push(item.date);
                  	this.ps.push(item.marketprice);
                });

                this.lineChartData = this.ps;
				this.chart.chart.config.data.labels = this.ds;
			});
	}

	public loadChartOptions(): void {
		this.lineChartOptions = {
			responsive: true
		};
		this.lineChartColors = [
		    { // grey
		      backgroundColor: 'rgba(148,159,177,0.2)',
		      borderColor: 'rgba(148,159,177,1)',
		      pointBackgroundColor: 'rgba(148,159,177,1)',
		      pointBorderColor: '#fff',
		      pointHoverBackgroundColor: '#fff',
		      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		    },
		    { // dark grey
		      backgroundColor: 'rgba(77,83,96,0.2)',
		      borderColor: 'rgba(77,83,96,1)',
		      pointBackgroundColor: 'rgba(77,83,96,1)',
		      pointBorderColor: '#fff',
		      pointHoverBackgroundColor: '#fff',
		      pointHoverBorderColor: 'rgba(77,83,96,1)'
		    },
		    { // grey
		      backgroundColor: 'rgba(148,159,177,0.2)',
		      borderColor: 'rgba(148,159,177,1)',
		      pointBackgroundColor: 'rgba(148,159,177,1)',
		      pointBorderColor: '#fff',
		      pointHoverBackgroundColor: '#fff',
		      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		    }
		];
		this.lineChartLegend = true;
		this.lineChartType = 'line';
	}

	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}

	public btnClickLogout(): void {
		localStorage.removeItem('currentUser');
	}
	// public lineChartData:Array<any> = [
	//     {data: [350, 460, 1100, 350, 10], label: 'Series A'},
	//     // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
	//     // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
	//   ];
  // public lineChartLabels:Array<any> = ['2017-12-10', '2017-12-11', '2017-12-14', '2017-12-15', '2017-12-18'];
  // public lineChartOptions:any = {
  //   responsive: true
  // };
  // public lineChartColors:Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  // public lineChartLegend:boolean = true;
  // public lineChartType:string = 'line';
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
 
  // events

}
