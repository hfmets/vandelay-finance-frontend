import { BuyStocksDialogComponent } from './../buy-stocks-dialog/buy-stocks-dialog.component';
import { MoneyService } from './../services/money.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from '../models/stock';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ObjectUnsubscribedError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { TableComponent } from '../visual/table/table/table.component';
import { VisualComponent } from '../visual/visual/visual.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  loggedIn!: boolean;
  stocks!: MatTableDataSource<Stock>;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns = [
    'symbol',
    'name',
    'price',
    'changesPercentage',
    'change',
    'dayLow',
    'dayHigh',
    'open',
    'previousClose',
    'buy',
  ];

  constructor(
    private moneyService: MoneyService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.moneyService.getStocks().subscribe({
      next: (res) => {
        let resArr = Object.keys(res).map((key) => {
          return res[key].stock;
        });
        resArr = resArr.slice(0, -2);
        let stocks: Stock[] = resArr.map((item) => {
          return {
            symbol: item.symbol,
            name: item.name,
            price: item.price,
            changesPercentage: item.changesPercentage,
            change: item.change,
            dayLow: item.dayLow,
            dayHigh: item.dayHigh,
            open: item.open,
            previousClose: item.previousClose,
          };
          // return {...row}
        });
        this.stocks = new MatTableDataSource<Stock>(stocks);
        this.stocks.paginator = this.paginator;
        this.stocks.sort = this.sort;
      },
    });

    this.loggedIn = this.cookieService.check('connect.sid');
  }

  openDialog(stock: Stock) {
    this.dialog.open(BuyStocksDialogComponent, { data: stock });
  }

  openModal(someTicker: string) {
    this.dialog.open(VisualComponent, {
      height: '700px',
      width: '1200px',
      data: {
        symbol: someTicker,
      },
    });
    return (this.apiService.SET_TICKER = someTicker);
  }

  applyFilter(filterValue: string) {
    this.stocks.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}
}
