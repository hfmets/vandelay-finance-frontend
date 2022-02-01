import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoneyService } from '../services/money.service';
import { WalletUpdateService } from '../services/wallet-update.service';

@Component({
  selector: 'app-buy-etf-dialog',
  templateUrl: './buy-etf-dialog.component.html',
  styleUrls: ['./buy-etf-dialog.component.css'],
})
export class BuyEtfDialogComponent implements OnInit {
  form!: FormGroup;
  error: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private moneyService: MoneyService,
    private dialogRef: MatDialogRef<BuyEtfDialogComponent>,
    private walletUpdate: WalletUpdateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      price: new FormControl({ value: this.data.price, disabled: true }),
      shares: new FormControl({ value: 0 }),
      total: new FormControl({ value: 0, disabled: true }),
    });

    this.shares?.valueChanges.subscribe((change) => {
      this.total?.setValue(change * this.price?.value);
    });
  }

  submitForm() {
    const reqBody = {
      ticker: this.data.symbol,
      value: this.total?.value,
      sharesTransacted: this.shares?.value,
      holdingKind: 'fund',
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

  get price() {
    return this.form.get('price');
  }

  get shares() {
    return this.form.get('shares');
  }

  get total() {
    return this.form.get('total');
  }
}
