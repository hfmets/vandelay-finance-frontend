import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IraService } from '../services/ira.service';

@Component({
  selector: 'app-buy-ira',
  templateUrl: './buy-ira.component.html',
  styleUrls: ['./buy-ira.component.css'],
})
export class BuyIraComponent implements OnInit {
  constructor(
    private iraService: IraService,
    @Inject(MAT_DIALOG_DATA) private data: string
  ) {}

  newIra: any = {};
  symbol: string = '';
  amount: number = 0;
  iraName: string = '';
  iraType: string = '';
  userId: number = 7;

  ngOnInit(): void {
    // data passed from FundsModalComponent
    let s = Object.values(this.data);
    this.symbol = s[0];
    this.iraName = s[1];
    this.iraType = s[2];
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

    this.iraService.addIra(this.newIra).subscribe();
    window.location.reload();
  }
}
