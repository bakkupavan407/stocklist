import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';

import { GetDataService } from '../_services/getdata.service';
import { StockService } from '../_services/stocks.service';

@Component({
  selector: 'all-stocks',
  templateUrl: './all-stocks.html'
})
export class AllStocksComponent {

    public columnDefs;
    public rowData;
    public editType;
    public gridOptions: GridOptions = {
      //suppressRowClickSelection: true,
      rowHeight: 42,
      headerHeight: 45,
      rowSelection: 'multiple',
      //overlayNoRowsTemplate: `<span>No results found for the criteria.</span>`,
      // groupSelectsChildren: true,
      // groupSelectsFiltered: false,
      // suppressAggFuncInHeader: true,
      animateRows: true
    };
    private api: GridApi;
    private columnApi: ColumnApi;
    public components;
    private exchanges; any;

    constructor(private getdataservice: GetDataService, private stockservice: StockService) {
        this.stockservice.getstocks()
            .subscribe(result => {
                this.rowData = result;
            });

        this.getdataservice.getexchanges()
            .subscribe(result => {
                this.exchanges = result;
            });
        // this.rowData = [{"_id":"5a310427d4319c04d96f1a93","selectedExchange":"5a2d8cda734d1d2932344c8d","selectedSecurity":"5a30c4b5734d1d2932368f1b","date":"2017-12-13T00:00:00.000Z","marketprice":"400","userid":"5a2d511b734d1d29323436de","timestamp":"2017-12-13T10:42:47.606Z"},{"_id":"5a3110b6d2c3620cb10a510e","selectedExchange":"5a2d8cda734d1d2932344c8d","selectedSecurity":"5a30c4b5734d1d2932368f1b","date":"2017-12-14T00:00:00.000Z","marketprice":"567","userid":"5a2d511b734d1d29323436de","timestamp":"2017-12-13T11:36:22.852Z"},{"_id":"5a311285d2c3620cb10a510f","selectedExchange":"5a2d8cda734d1d2932344c8d","selectedSecurity":"5a30c4b5734d1d2932368f1b","date":"2017-12-13T00:00:00.000Z","marketprice":"443","userid":"5a2d511b734d1d29323436de","timestamp":"2017-12-13T11:44:05.606Z"},{"_id":"5a311538d2c3620cb10a5110","selectedExchange":"5a2d8cda734d1d2932344c8d","selectedSecurity":"5a30c4b5734d1d2932368f1b","date":"2017-12-13T00:00:00.000Z","marketprice":"34","userid":"5a2d511b734d1d29323436de","timestamp":"2017-12-13T11:55:36.214Z"},{"_id":"5a31168eed061b0014be5049","selectedExchange":"5a2d8cda734d1d2932344c8d","selectedSecurity":"5a30c4b5734d1d2932368f1b","date":"2017-12-13T00:00:00.000Z","marketprice":"999","userid":"5a2d511b734d1d29323436de","timestamp":"2017-12-13T12:01:18.895Z"}];
        
        this.columnDefs = [
            { 
                width: 50,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
              width: 200,
              headerName: "Date",
              field: "date",
              editable: true
            },
            {
              headerName: "Exchange", 
              field: "exchange", 
              width: 200,
              editable: true,
              cellEditor: "select",
              cellEditorParams: {
                values: ["AAA", "BBB", "CCC"]
              }
             },
            {
              headerName: "Security", 
              field: "security", 
              width: 200, 
              editable: true,
              cellEditor: "select",
              cellEditorParams: {
                values: ["AAA", "BBB", "CCC"]
              }
            },
            {
              headerName: "Market Price", 
              field: "marketprice", 
              width: 100,
              editable: true,
              cellEditor: "text"
            }
        ];
        this.editType = "fullRow";
        // this.components = { datePicker: getDatePicker() };
    }

    public onReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
    }


      private resizeGrid() {
        if (this.api) {
          this.api.sizeColumnsToFit();
        }
      }

      // private setSelection(): void {
      //   if (this.api) {
      //       this.selectedData = this.api.getSelectedRows();
      //   }
      // }

      private refreshAggregates() {
        this.api.recomputeAggregates();
      }

      // private createRowData() {
      //   return this.rowData = this.datasets;
      // }
}

// function getDatePicker() {
//   function Datepicker() {}
//   Datepicker.prototype.init = function(params) {
//     this.eInput = document.createElement("input");
//     this.eInput.value = params.value;

//     this.eInput.onclick = function(){
//       $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
//     };

    
//   };
//   Datepicker.prototype.getGui = function() {
//     return this.eInput;
//   };
//   Datepicker.prototype.afterGuiAttached = function() {
//     this.eInput.focus();
//     this.eInput.select();
//   };
//   Datepicker.prototype.getValue = function() {
//     return this.eInput.value;
//   };
//   Datepicker.prototype.destroy = function() {};
//   Datepicker.prototype.isPopup = function() {
//     return false;
//   };
//   return Datepicker;
// }
