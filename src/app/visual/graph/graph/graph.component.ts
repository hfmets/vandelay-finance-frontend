
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';

declare var google: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  dataSource: any;
  stock: any;
  _low: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  displayedColumns = this.getColumns();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSingle().subscribe((data) => {
      this.stock = data;

      this.dataSource = new MatTableDataSource<StockElement>(this.stock);
      this.dataSource.paginator = this.paginator;

      this._low = this.dataSource.filteredData;
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart(this._low));
    });
  }

  getColumns() {
    return this.apiService.displayingColumns;
  }

  drawChart(stuff: any) {
    // var stuff = this.gotRows
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'open');
    data.addColumn('number', 'high');
    data.addColumn('number', 'low');
    data.addColumn('number', 'close');

    stuff.forEach((singleStock: any) => {
      data.addRow(
        [
          singleStock['date'],
          singleStock['low'],
          singleStock['open'],
          singleStock['close'],
          singleStock['high'],
        ],
        true
      );
    });

    var options = {
      title: this._low[0]['symbol'],
      legend: 'none',
      bar: { groupWidth: '100%' }, // Remove space between bars.
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
        risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
      },
    };

    var chart = new google.visualization.CandlestickChart(
      document.getElementById('chart_div')
    );
    chart.draw(data, options);
  }
}

export interface StockElement {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_close: number;
  split_factor: number;
  dividend: number;
  symbol: string;
  exchange: number;
  date: Date;
}