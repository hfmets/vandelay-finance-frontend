import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IraService } from '../services/ira.service';
import { MoneyService } from '../services/money.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMoneyComponent } from '../add-money/add-money.component';

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
    // this.moneyService.getAccountBalance().subscribe((res) => {
    //   this.userBalance = res.accountBalance;
    //   this.userId = res.userId;
    // });
    this.userId = 'p392-2rej3-243e-3eii4';

    // check user has enough money
    if (this.userBalance > this.amount) {
      this.enoughMoney = true;
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
      this.iraService.addIra(this.newIra).subscribe();
      window.location.reload();
    } else {
      this.dialog.open(AddMoneyComponent);
    }
    console.log('enough money', this.enoughMoney);
  }
}
