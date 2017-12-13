import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';

@Component({
  selector: 'all-stocks',
  templateUrl: './all-stocks.html'
})
export class AllStocksComponent {
     // private gridOptions: GridOptions = {
     //    enableColResize: true,
     //    enableSorting: true,
     //    enableFilter: true,
     //    suppressRowClickSelection: true,
     //    rowHeight: 42,
     //    headerHeight: 45,
     //    rowSelection: 'multiple',
     //    overlayNoRowsTemplate: `<span>No results found for the criteria.</span>`,
     //    // onGridReady: this.prepGrid.bind(this),
     //    // onModelUpdated: this.resizeGrid.bind(this),
     //    // onSelectionChanged: this.setSelection.bind(this),
     //    // onFilterChanged: this.refreshAggregates.bind(this),
     //    groupSelectsChildren: true,
     //    groupSelectsFiltered: false,
     //    suppressAggFuncInHeader: true,
     //    animateRows: true
     //  };
     //  private api: GridApi;
     //  private columnApi: ColumnApi;

    private gridApi;
    private gridColumnApi;

    private columnDefs;
    private rowData;
    private editType;

    constructor() {
        this.columnDefs = [
          {
            headerName: "Make",
            field: "make",
            editable: true,
            cellEditor: "select",
            cellEditorParams: {
              values: ["AAA", "BBB", "CCC"]
            }
          },
          {
            headerName: "Model",
            field: "model",
            editable: true
          },
          {
            headerName: "Price",
            field: "price",
            editable: true,
            //cellEditor: getNumericCellEditor()
          },
          {
            headerName: "Suppress Navigable",
            field: "field5",
            editable: true,
            suppressNavigable: true
          },
          {
            headerName: "Not Editable",
            field: "field6",
            editable: false
          }
        ];
        this.rowData = [{
      make: "Toyota",
      model: "Celica",
      price: 35000,
      field5: "Sample 22",
      field6: "Sample 23"
    },{
      make: "Ford",
      model: "Mondeo",
      price: 32000,
      field5: "Sample 24",
      field6: "Sample 25"
    },{
      make: "Porsche",
      model: "Boxter",
      price: 72000,
      field5: "Sample 26",
      field6: "Sample 27"
    }];
        this.editType = "fullRow";
        // this.columnDefs = [
        //     {headerName: "Make", field: "make", width: 300},
        //     {headerName: "Model", field: "model", width: 300},
        //     {headerName: "Price", field: "price", width: 300}
        // ];

        // this.rowData = [
        //     {make: "Toyota", model: "Celica", price: 35000},
        //     {make: "Ford", model: "Mondeo", price: 32000},
        //     {make: "Porsche", model: "Boxter", price: 72000}
        // ]

        // this.columnDefs = [
        //     { 
        //         width: 50,
        //         headerCheckboxSelection: true,
        //         headerCheckboxSelectionFilteredOnly: true,
        //         checkboxSelection: true
        //     },
        //     {headerName: "Sno", field: "sno", width: 50},
        //     {headerName: "Date", field: "date", width: 100},
        //     {headerName: "Exchange", field: "exchange", width: 100},
        //     {headerName: "Security", field: "security", width: 200},
        //     {headerName: "Market Price", field: "marketprice", width: 200}
        // ];

        // this.rowData = [
        //     {sno: 1, date: "29/12/17", exchange: "BSE", security: "Reliance", marketprice: 200},
        //     {sno: 2, date: "30/12/17", exchange: "NSE", security: "JIO", marketprice: 300},
        //     {sno: 3, date: "1/12/17", exchange: "CSE", security: "OIL", marketprice: 500}
        // ];
    }

    private onModelUpdated(event) {

    }

    private onCellClicked(event) {

    }

    private onCellDoubleClicked(event) {
        
    }

}
