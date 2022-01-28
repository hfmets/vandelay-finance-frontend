import { WalletUpdateService } from './../services/wallet-update.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoneyService } from '../services/money.service';

@Component({
  selector: 'app-buy-stocks-dialog',
  templateUrl: './buy-stocks-dialog.component.html',
  styleUrls: ['./buy-stocks-dialog.component.css'],
})
export class BuyStocksDialogComponent implements OnInit {
  form!: FormGroup;
  error: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private moneyService: MoneyService,
    private dialogRef: MatDialogRef<BuyStocksDialogComponent>,
    private walletUpdate: WalletUpdateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      last: new FormControl({ value: this.data.last, disabled: true }),
      shares: new FormControl({ value: 0 }),
      total: new FormControl({ value: 0, disabled: true }),
    });

    this.shares?.valueChanges.subscribe((change) => {
      this.total?.setValue(change * this.last?.value);
    });
  }

  submitForm() {
    const reqBody = {
      ticker: this.data.ticker,
      value: this.total?.value,
      sharesTransacted: this.shares?.value,
      holdingKind: 'stock',
    };

    this.moneyService.purchaseStock(reqBody).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.error = err.error.message;
      },
      complete: () => {
        this.walletUpdate.changeWalletUpdate(true);
        this.dialogRef.close();
      },
    });
  }

  get last() {
    return this.form.get('last');
  }

  get shares() {
    return this.form.get('shares');
  }

  get total() {
    return this.form.get('total');
  }
}
