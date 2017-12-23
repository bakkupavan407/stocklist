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
      onSelectionChanged: this.setSelection.bind(this),
      animateRows: true
    };
    private api: GridApi;
    private columnApi: ColumnApi;
    public components;
    private exchanges: any;
    private securities: any;

    public exchangeNames = [];
    public securityNames = [];

    constructor(private getdataservice: GetDataService, private stockservice: StockService) {
        this.stockservice.getstocks()
            .subscribe(result => {
                this.rowData = result;
            });

        this.getdataservice.getexchanges()
            .subscribe(result => {
                result.forEach(exchange => {
                  this.exchangeNames.push(exchange.name);
                })
                this.exchanges = result;
            });

        this.getdataservice.getsecurities()
            .subscribe(result => {
                result.forEach(security=> {
                  this.securityNames.push(security.securityname);
                });
                this.securities = result;
            });

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
              editable: true,
              cellEditor: "datePicker"
            },
            {
              headerName: "Exchange",
              field: "exchange",
              width: 200,
              editable: true,
              cellRenderer: ( (data: any) => {
                 var exchange = this.exchanges.find(exchange => exchange._id == data.value || exchange.name == data.value);
                // here I've added the check for 'color.id' and 'color.name' because initailly from DB will com the id and afterwards form selectparams will come the name
                return exchange.name;
              }),
              onCellValueChanged: ( (data: any) => {
                /**
                 * because 'select' does not offer us the possibility to use 'key-value' as traditional,
                 * we will use only values in 'select' and changed to 'id' when will be saved.
                 */
                var selectedExchangeName = data.data.exchange;
                data.data.selectedExchange = this.exchanges.find(exchange => exchange.name == selectedExchangeName)._id;
              }),
              cellEditor: 'select',
              cellEditorParams: {
                  values: this.exchangeNames
              }
             },
            {
              headerName: "Security",
              field: "security",
              width: 200,
              editable: true,
              cellEditor: "select",
              cellRenderer: ( (data: any) => {
                 var security = this.securities.find(security => security._id == data.value || security.securityname == data.value);
                return security.securityname;
              }),
              onCellValueChanged: ( (data: any) => {
                var selectedSecurityName = data.data.security;
                data.data.selectedSecurity = this.securities.find(security => security.securityname == selectedSecurityName)._id;
              }),
              cellEditorParams: {
                values: this.securityNames
              }
            },
            {
              headerName: "Market Price",
              field: "marketprice",
              width: 100,
              editable: true,
              cellEditor: "text"
            },
            { headerName: "",
              width: 175,
              cellRenderer: deleteRecord
            }
        ];
        this.editType = "fullRow";
        this.components = { datePicker: getDatePicker()};
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

    private setSelection(): void {
      if (this.api) {
          let selectedData = this.api.getSelectedRows();
          console.log(selectedData);
      }
    }

    private refreshAggregates() {
      this.api.recomputeAggregates();
    }

}

function deleteRecord(params) {
  console.log(params);
  var html = '<a title="Remove" href="javascript:;" class="align-center btn-link btn-sm" ng-click="removeRecord(' + params.rowIndex + ')">Delete</a>';
  return html;
}

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function(params) {
    this.eInput = document.createElement("input");
    // var mydate = new Date(params.value);
    // 2013-01-08
    this.eInput.type = "date";
    this.eInput.value = params.value;
    // this.eInput.onclick = function(){
    //   // (<any>$(this.eInput)).datepicker({ dateFormat: "dd/mm/yy" });
    //   jQuery(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
    // };
  };
  Datepicker.prototype.getGui = function() {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function() {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function() {};
  Datepicker.prototype.isPopup = function() {
    return false;
  };
  return Datepicker;
}
