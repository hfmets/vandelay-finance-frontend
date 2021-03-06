import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IraService } from '../services/ira.service';
import { MoneyService } from '../services/money.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMoneyComponent } from '../add-money/add-money.component';
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
    private dialog: MatDialog,
    private wallet: WalletUpdateService,
    @Inject(MAT_DIALOG_DATA) private data: string
  ) {}

  error: string = '';
  newIra: any = {};
  symbol: string = '';
  priceStr: string = '';
  amount: number = 0;
  iraName: string = '';
  iraType: string = '';
  //userId is a string
  userId: string = '';
  //userId: number = 7;
  userBalance: number = 1500;
  enoughMoney: boolean = false;

  ngOnInit(): void {
    // data passed from FundsModalComponent
    let s = Object.values(this.data);
    this.symbol = s[0];
    this.priceStr = s[1];
    this.iraName = s[2];
    this.iraType = s[3];
  }

  buyIra() {
    // get users id and account balance
    this.moneyService.getAccountBalance().subscribe((res) => {
      this.userBalance = res.accountBalance;
      this.userId = res.userId;
      this.addFundToIra();
    });

    //this.userId = 'e1f8ea09-52ff-40ca-a774-86955a7ba3a8';
    //console.log('enough money', this.enoughMoney);
  }

  addFundToIra() {
    // check user has enough money
    if (this.userBalance > this.amount) {
      this.enoughMoney = true;
      //create ira with mutual fund symbol and amount
      this.newIra = {
        name: this.iraName,
        balance: this.amount,
        type: this.iraType,
        userId: this.userId,
        mutualFundId: this.symbol,
        etfId: null,
        stockId: null,
      };
      this.iraService.addIra(this.newIra).subscribe();
      this.moneyService.spend(this.amount).subscribe((res) => {
        this.wallet.changeWalletUpdate(true);
      });
      window.location.reload();
    } else {
      this.dialog.open(AddMoneyComponent);
    }
  }
}
