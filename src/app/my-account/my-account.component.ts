import { WalletUpdateService } from './../services/wallet-update.service';
import { SellHoldingsDialogComponent } from './../sell-holdings-dialog/sell-holdings-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MoneyService } from './../services/money.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Holding } from '../models/holding';
import { Transaction } from '../models/transaction';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit, AfterViewInit {
  holdings!: MatTableDataSource<Holding>;
  transactions!: MatTableDataSource<Transaction>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  displayedColumnsHoldings = ['ticker', 'kind', 'sharesOwned', 'actions'];
  displayedColumnsTransactions = [
    'ticker',
    'kind',
    'value',
    'sharesTransacted',
    'date',
  ];

  constructor(
    private moneyService: MoneyService,
    public dialog: MatDialog,
    private walletUpdate: WalletUpdateService
  ) {}

  ngOnInit(): void {
    this.setUserInfo();

    this.walletUpdate.currentUserInfoUpdate$.subscribe((res) => {
      if (res == true) {
        this.setUserInfo();
      }
    });
  }

  setUserInfo() {
    this.moneyService.getAccountInfo().subscribe((res) => {
      let holdings: Holding[] = res.holdings.map((item: any) => {
        return {
          ticker: item.ticker,
          kind: item.kind,
          sharesOwned: item.sharesOwned,
        };
      });

      let transactions: Transaction[] = res.transactions.map((item: any) => {
        return {
          kind: item.kind,
          ticker: item.ticker,
          value: item.value,
          sharesTransacted: item.sharesTransacted,
          date: item.createdAt,
        };
      });

      this.holdings = new MatTableDataSource<Holding>(holdings);
      this.holdings.paginator = this.paginator.toArray()[0];
      this.transactions = new MatTableDataSource<Transaction>(transactions);
      this.transactions.paginator = this.paginator.toArray()[1];
    });
  }

  openDialog(holding: Holding) {
    this.dialog.open(SellHoldingsDialogComponent, { data: holding });
  }

  ngAfterViewInit() {}
}
