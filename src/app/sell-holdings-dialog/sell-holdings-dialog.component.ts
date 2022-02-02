import { MoneyService } from './../services/money.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletUpdateService } from '../services/wallet-update.service';

@Component({
  selector: 'app-sell-holdings-dialog',
  templateUrl: './sell-holdings-dialog.component.html',
  styleUrls: ['./sell-holdings-dialog.component.css'],
})
export class SellHoldingsDialogComponent implements OnInit {
  sellingPrice!: number;

  sellHoldingsForm = new FormGroup({
    shares: new FormControl({ value: 0 }, [
      Validators.required,
      Validators.max(this.data.sharesOwned),
      Validators.min(1),
    ]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private moneyService: MoneyService,
    private dialogRef: MatDialogRef<SellHoldingsDialogComponent>,
    private walletUpdate: WalletUpdateService
  ) {}

  ngOnInit(): void {
    if (this.data.kind == 'stock') {
      this.moneyService.getStock(this.data.ticker).subscribe((res) => {
        this.sellingPrice = res.data[0].close;
      });
    } else if (this.data.kind == 'fund') {
      this.moneyService.getFund(this.data.ticker).subscribe((res) => {
        console.log(res);
        this.sellingPrice = res[0].price;
      });
    }
  }

  submitForm() {
    const reqBody = {
      ticker: this.data.ticker,
      sharesTransacted: this.shares?.value,
    };

    this.moneyService.sellStock(reqBody).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.walletUpdate.changeWalletUpdate(true);
        this.walletUpdate.changeUserInfoUpdate(true);
        this.dialogRef.close();
      },
    });
  }

  get shares() {
    return this.sellHoldingsForm.get('shares');
  }
}
