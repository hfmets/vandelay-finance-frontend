import { BuyEtfDialogComponent } from './../buy-etf-dialog/buy-etf-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { HorizontalService } from 'src/app/services/horizontal.service';
import { HttpClient } from '@angular/common/http';
import { EtfService } from '../services/etf.service';
import { ETF } from '../models/etf';
import { MatSort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-etfs',
  templateUrl: './etfs.component.html',
  styleUrls: ['./etfs.component.css'],
})
export class EtfsComponent implements OnInit {
  dataSource: any;
  etf: any;
  _low: any;
  loggedIn!: boolean;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
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
    private apiService: ApiService,
    private etfService: EtfService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.etfService.getEtfs().subscribe((etfs) => {
      let responseArray = Object.keys(etfs).map((key) => {
        return etfs[key];
      });
      let etfResponse: ETF[] = responseArray.map((eachEtfs) => {
        return {
          symbol: eachEtfs.symbol,
          name: eachEtfs.name,
          price: eachEtfs.price,
          changesPercentage: eachEtfs.changesPercentage,
          change: eachEtfs.change,
          dayLow: eachEtfs.dayLow,
          dayHigh: eachEtfs.dayHigh,
          open: eachEtfs.open,
          previousClose: eachEtfs.previousClose,
        };
      });
      // this.etf = etfResponse;
      this.etf = new MatTableDataSource<ETF>(etfResponse);
      this.etf.paginator = this.paginator;
      this.etf.sort = this.sort;
    });
    this.loggedIn = this.cookieService.check('connect.sid');
  }

  openDialog(etf: ETF) {
    this.dialog.open(BuyEtfDialogComponent, { data: etf });
  }

  applyFilter(filterValue: string) {
    this.etf.filter = filterValue.trim().toLowerCase();
  }
}
