import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDataService } from '../_services/getdata.service';
import { FilterService } from '../_services/filter.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { DatepickerOptions } from 'ng2-datepicker/bundles/ng2-datepicker.umd';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';

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

	public ds = [];
	public ps = [];

	public lineChartData;
	public lineChartLabels;
	public lineChartOptions;
	public lineChartColors;
	public lineChartLegend;
	public lineChartType;

	public showErrorMsg: string = "";

	public labelExchange: string;
	public labelSecurity: string;

	options: DatepickerOptions = {
		displayFormat: 'DD/MM/YYYY'
	};

	constructor(private getdataservice: GetDataService, private filterservice: FilterService) {
		this.filter = {};
		this.filter.fromdate = new Date();
		this.filter.todate = new Date();
		this.filter.selectedExchange = 1;
		this.filter.selectedSecurity = 1;

		this.getdataservice.getuserexchanges()
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

    	this.getdataservice.getusersecurities()
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

   //      this.filterservice.getfilterdata(this.filter)
			// .subscribe(result => {
			// 	result.forEach(item=> {
			// 		let price = item.marketprice;
			// 		let mydate = new Date(item.date);
		 //   			item.date = mydate.getFullYear() + "-" + ( mydate.getMonth() + 1) + "-" + mydate.getDate();
   //                	this.filterDates.push(item.date);
   //                	this.filterPrice.push(item.marketprice);
   //              });
   //              this.lineChartData = [
			// 		{data: this.filterPrice, label: ''},
			// 	];
			// 	this.lineChartLabels = this.filterDates;
			// 	this.loadChartOptions();
			// 	this.loadChart = true;
			// });
	}

	ngOnInit() {
		
	}

	public setSelected(selectElement) {
		var selector = selectElement.name;
		for (var i = 0; i < selectElement.options.length; i++) {
            var optionElement = selectElement.options[i];
            if (optionElement.selected == true) { 
            	if(selector === "selectedSecurity") {
            		this.labelSecurity = optionElement.text;	
            	} else {
            		this.labelExchange = optionElement.text;
            	}
            }
        }
	}

	keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.btnFilterGo();
    }
  }

	public btnFilterGo(): void {
		// this.lineChartData = [];
		// this.lineChartLabels = [];
		// if(this.chart) {
		// 	this.chart.chart.config.data.labels = [];
		// }
		if(this.filter.fromdate && this.filter.todate && (this.filter.selectedExchange !== 1) && (this.filter.selectedSecurity !== 1)) {
			var fromdate = new Date(this.filter.fromdate);
			var todate = new Date(this.filter.todate);

			var fromDay = fromdate.getDate();
			var fromMonth = fromdate.getMonth() + 1;
			var fromFinalDay = fromDay.toString().length === 1 ? "0" + fromDay : fromDay;
			var fromFinalMonth = fromMonth.toString().length === 1 ? "0" + fromMonth : fromMonth;

			var toDay = todate.getDate();
			var toMonth = todate.getMonth() + 1;
			var toFinalDay = toDay.toString().length === 1 ? "0" + toDay : toDay;
			var toFinalMonth = toMonth.toString().length === 1 ? "0" + toMonth : toMonth;

			var labelFromDate = fromdate.getDate() + "/" + ( fromdate.getMonth() + 1) + "/" + fromdate.getFullYear();
			var labelToDate = todate.getDate() + "/" + ( todate.getMonth() + 1) + "/" + todate.getFullYear();
			
			// this.filter.fromdate = this.filter.fromdate.split("-").join("/");
			// this.filter.todate = this.filter.todate.split("-").join("/");

			this.filter.fromdate = fromdate.getFullYear() + "/" + fromFinalMonth + "/" + fromFinalDay;
			this.filter.todate = todate.getFullYear() + "/" + toFinalMonth + "/" + toFinalDay;

			this.filterservice.getfilterdata(this.filter)
			.subscribe(result => {
				if(result.length > 0) {
					this.ds = [];
					this.ps = [];
					result.forEach(item=> {
						// let price = item.marketprice;
						// let mydate = new Date(item.date);
			            // item.date = mydate.getFullYear() + "-" + ( mydate.getMonth() + 1) + "-" + mydate.getDate();
	                  	this.ds.push(item.date);
	                  	this.ps.push(item.marketprice);
	                });
					this.lineChartData = [
						{data: this.ps, label: this.labelSecurity + " on " + this.labelExchange + " from " + labelFromDate + " to " + labelToDate}
					];
	    			this.lineChartLabels = this.ds;
	    			if(this.chart) {
	    				this.chart.chart.config.data.labels = this.ds;
	    			}
					this.loadChartOptions();
					this.loadChart = true;
				} else {
					alert("No stock data with this combination.");					
				}
			});
		} else {
			this.showErrorMsg = "All fields below are required.";
		}
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

	public defaultFromDate(event) {
		var period = event.target.innerText;
		var defaultdate = new Date();
		var d = new Date();

		if(period === "1M") {
			d.setMonth(d.getMonth() - 1);
		}

		if(period === "3M") {
			d.setMonth(d.getMonth() - 3);
		}

		if(period === "6M") {
			d.setMonth(d.getMonth() - 6);
		}

		if(period === "1Y") {
			d.setFullYear(d.getFullYear() - 1);
		}

		if(period === "3Y") {
			d.setFullYear(d.getFullYear() - 3);
		}

		if(period === "5Y") {
			d.setFullYear(d.getFullYear() - 5);
		}

		this.filter.fromdate = d;
	}

}
