import { WalletUpdateService } from './../services/wallet-update.service';
import { AddFundsDialogComponent } from './../add-funds-dialog/add-funds-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MoneyService } from './../services/money.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  name: string = JSON.parse(localStorage.getItem('name') || '');
  balance!: number;
  constructor(
    private moneyService: MoneyService,
    public dialog: MatDialog,
    private walletUpdate: WalletUpdateService
  ) {}

  ngOnInit(): void {
    this.setBalance();

    this.walletUpdate.currentWalletUpdate$.subscribe((res) => {
      if (res == true) {
        this.setBalance();
      }
    });
  }

  setBalance() {
    this.moneyService.getAccountBalance().subscribe((res) => {
      this.balance = res.accountBalance;
    });
  }

  openDialog() {
    this.dialog.open(AddFundsDialogComponent);
  }
}
