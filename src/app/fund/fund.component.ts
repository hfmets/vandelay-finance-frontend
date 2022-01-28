import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MutualfundService } from '../services/mutualfund.service';
import { Fund } from '../funds/fund.model';
declare var google: any;

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css'],
})
export class FundComponent implements OnInit, AfterViewInit {
  fund: Fund = {};
  data_table = [];

  constructor(
    private route: ActivatedRoute,
    private fundsService: MutualfundService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   const symbol = params['symbol'];
    //   this.fundsService.getFund(symbol).subscribe((payload) => {
    //     //console.log('Fund Payload ', payload);
    //     this.fund = payload;
    //   });
    // });
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });

    this.route.params.subscribe((params) => {
      // const symbol = params['symbol'];
      const symbol = 'SLGD';
      console.log('this.symbol2', symbol);

      this.fundsService.getHistoricalData(symbol).subscribe({
        next: (res) => {
          let resArr = Object.keys(res).map((key) => {
            return res[key];
          });
          resArr = resArr.slice(0, -2);
          let funds: Fund[] = resArr.map((item) => {
            return {
              date: item['date'],
              price: item['close'],
            };
          });
          console.log('funds', typeof funds);
          google.charts.setOnLoadCallback(this.drawChart(funds));
        },
      });
    });
  }

  drawChart(funds_arr: Fund[]) {
    //console.log('symbol3', this.fund.symbol);
    //console.log('type', typeof funds_arr[0]);
    console.log('chart', funds_arr[0]);
    funds_arr.map((item) => {
      //date, close
      // return {
      //   date: new Date(item.date),
      //   price: item.close,
      // };
      //let dateType = new Date(item.date);
      //console.log('date', typeof item['date']);
      //console.log('price', typeof item['price']);
      console.log('vals', Object.values(item));
      //this.data_table.push(Object.values(item));
    });
    //Object.keys(funds_arr).map((k) => funds_arr[k]);
    //console.log('vals', Object.values(funds_arr));

    //console.log('table', this.data_table);
    // Create the data table.
    var data = google.visualization.arrayToDataTable(this.data_table, true);

    var options = {
      legend: 'none',
      vAxis: {
        format: 'currency',
        gridlines: {
          color: 'transparent',
        },
      },
      hAxis: {},
      chartArea: {
        top: 10,
        width: '100%',
        height: '100%',
      },
      height: 400,
      width: 950,
    };

    var chart = new google.visualization.AreaChart(
      document.getElementById('divCandleChart')
    );

    chart.draw(data, options);
  }
}
