import { MoneyService } from './../services/money.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from '../models/stock';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) stockTable!: MatTable<any>;
  tickers = [
    'MSFT',
    'AAPL',
    'AMZN',
    'GOOG',
    'GOOGL',
    'BABA',
    'FB',
    'BRK.B',
    'BRK.A',
    'VOD',
    'V',
    'JPM',
    'JNJ',
    'WMT',
    'MA',
    'PG',
    'TSM',
    'CHT',
    'RHHBF',
    'RHHVF',
  ];
  stocks = new MatTableDataSource<Stock>();

  displayedColumns = ['ticker', 'name', 'price', 'buy'];

  constructor(private moneyService: MoneyService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.tickers.forEach((ticker) => {
    //   this.moneyService.getStock(ticker).subscribe({
    //     next: (res) => {
    //       this.stocks.data.push({
    //         ticker: res[0].symbol,
    //         price: res[0].close,
    //       });
    //       console.log(this.stocks);
    //       this.stockTable.renderRows();
    //     },
    //   });
    // });
  }
}
