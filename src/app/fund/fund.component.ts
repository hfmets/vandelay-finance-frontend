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
  data_table = Array();

  constructor(
    private route: ActivatedRoute,
    private fundsService: MutualfundService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      //const symbol = params['symbol'];
      const symbol = 'SLGD';
      console.log('symbol1', symbol);
      this.fundsService.getFund(symbol).subscribe({
        next: (res) => {
          console.log('res', res);
          let fund = {
            symbol: res.symbol,
            name: res.name,
            price: res.price,
            change: res.change,
            changesPercentage: res.changesPercentage,
          };
          this.fund = fund;
        },
      });
    });
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
            let dateType = new Date(item.date);
            return {
              date: dateType,
              price: item['close'],
            };
          });
          console.log('funds', funds);
          google.charts.setOnLoadCallback(this.drawChart(funds));
        },
      });
    });
  }

  drawChart(funds_arr: Fund[]) {
    funds_arr.map((item) => {
      //date, close
      let fund_data = {
        date: item['date'],
        price: item['price'],
      };

      this.data_table.push(Object.values(fund_data));
    });

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
