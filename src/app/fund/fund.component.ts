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
  funds_arr = [];
  data_table = [];

  constructor(
    private route: ActivatedRoute,
    private fundsService: MutualfundService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const symbol = params['symbol'];
      this.fundsService.getFund(symbol).subscribe((payload) => {
        //console.log('Fund Payload ', payload);
        this.fund = payload;
      });
    });
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });

    this.route.params.subscribe((params) => {
      const symbol = params['symbol'];
      console.log('this.symbol2', symbol);
      this.fundsService.getHistoricalData(symbol).subscribe((payload) => {
        //console.log('payload', payload);
        this.funds_arr = payload;
        // console.log('data', payload.historical[0]['date']);
        //console.log('data1', this.funds_arr);
        google.charts.setOnLoadCallback(this.drawChart(this.funds_arr));
      });
    });
  }

  drawChart(funds_arr: any) {
    //console.log('symbol3', this.fund.symbol);
    console.log('chart', funds_arr);
    // funds_arr.forEach((fund) => {
    //   //date, open, high, low, close
    //   let fund_data = {
    //     date: fund['date'],
    //     // open: fund['open'],
    //     // high: fund['high'],
    //     // low: fund['low'],
    //     price: fund['close'],
    //   };
    //   let date = new Date(fund_data['date']);
    //   fund_data['date'] = date;
    //   // let dollarsUS = Intl.NumberFormat('en-US', {
    //   //   style: 'currency',
    //   //   currency: 'USD',
    //   // });
    //   //dollarsUS.format(fund_data['price']);
    //   //console.log('ddate', fund_data['date']);
    //   //console.log('Date', date);
    //   //console.log('price', dollarsUS.format(fund_data['price']));
    //   this.data_table.push(Object.values(fund_data));
    // });

    console.log('table', this.data_table);
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
