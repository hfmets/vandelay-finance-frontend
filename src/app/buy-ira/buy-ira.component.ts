import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IraService } from '../services/ira.service';
import { MoneyService } from '../services/money.service';
import { WalletUpdateService } from '../services/wallet-update.service';

@Component({
  selector: 'app-buy-ira',
  templateUrl: './buy-ira.component.html',
  styleUrls: ['./buy-ira.component.css'],
})
export class BuyIraComponent implements OnInit {
  constructor(
    private iraService: IraService,
    private moneyService: MoneyService,
    private walletUpdate: WalletUpdateService,
    private dialogRef: MatDialogRef<BuyIraComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string
  ) {}

  error: string = '';
  newIra: any = {};
  symbol: string = '';
  priceStr: string = '';
  amount: number = 0;
  iraName: string = '';
  iraType: string = '';
  userId: number = 7;

  ngOnInit(): void {
    // data passed from FundsModalComponent
    let s = Object.values(this.data);
    this.symbol = s[0];
    this.priceStr = s[1];
    this.iraName = s[2];
    this.iraType = s[3];
  }

  buyIra() {
    //create ira
    this.newIra = {
      name: this.iraName,
      balance: this.amount,
      type: this.iraType,
      userId: this.userId,
      mutualFundId: this.symbol,
      etfId: null,
      stockId: null,
    };

    const reqBody = {
      ticker: this.symbol,
      value: this.amount,
      sharesTransacted: this.amount / Number(this.priceStr),
      holdingKind: 'ira',
    };

    this.iraService.addIra(this.newIra).subscribe();
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
    //window.location.reload();
  }
}
