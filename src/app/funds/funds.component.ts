import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MutualfundService } from '../services/mutualfund.service';
import { Fund } from '../funds/fund.model';
import { FundComponent } from '../fund/fund.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { BuyMutualFundsDialogComponent } from '../buy-mutual-funds-dialog/buy-mutual-funds-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css'],
})
export class FundsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  loggedIn!: boolean;
  constructor(
    private fundService: MutualfundService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  //console.log(dataSource);
  funds!: MatTableDataSource<Fund>;
  displayedColumns: string[] = ['name', 'symbol', 'price', 'buy'];

  ngOnInit(): void {
    this.fundService.getFunds().subscribe({
      next: (res) => {
        let resArr = Object.keys(res).map((key) => {
          return res[key];
        });
        // delete cache/api and time from response
        resArr = resArr.slice(0, -2);
        let funds: Fund[] = resArr.map((item) => {
          return {
            symbol: item.symbol,
            name: item.name,
            price: item.price,
          };
        });
        this.funds = new MatTableDataSource<Fund>(funds);
        this.funds.paginator = this.paginator;
        this.funds.sort = this.sort;

        console.log('funds', this.funds);
      },
    });
    //console.log('2', this.dataSource);
    this.loggedIn = this.cookieService.check('connect.sid');
  }

  ngAfterViewInit(): void {}

  applyFilter(filterValue: string) {
    this.funds.filter = filterValue.trim().toLowerCase();
  }

  openModal(symbol: string) {
    // let dialogRef =
    this.dialog.open(FundComponent, {
      height: '600px',
      width: '1000px',
      data: {
        symbol: symbol,
      },
    });
    // this.dialogRef = this.dialog.open(FundComponent, {
    //   width: '600px',
    //   height: '1000px',
    //   data: {
    //     data: symbol,
    //   },
    // });
  }

  openDialog(fund: Fund) {
    this.dialog.open(BuyMutualFundsDialogComponent, { data: fund });
  }
}
