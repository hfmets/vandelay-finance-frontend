import { Component, OnInit } from '@angular/core';
import { IraService } from '../services/ira.service';
import { Ira } from '../ira/ira.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MoneyService } from '../services/money.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-ira',
  templateUrl: './add-ira.component.html',
  styleUrls: ['./add-ira.component.css'],
})
export class AddIraComponent implements OnInit {
  newIra: any = {};
  iras: Ira[] = [];
  id: number = 0;
  userId: string = '';
  //userId: number = 7;
  name: string = '';
  balance: number = 0;
  type: string = '';
  amount: number = 0;
  ticker: string = '';
  form: FormGroup;
  selectedValue: string = '';

  types: Type[] = [
    { value: '0', viewValue: 'Traditional IRA' },
    { value: '1', viewValue: 'Roth IRA' },
  ];

  constructor(
    private fundService: IraService,
    private moneyService: MoneyService,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: this.name,
      amount: this.amount,
      type: this.type,
      ticker: this.ticker,
      userId: this.userId,
      id: this.id,
    });
  }

  ngOnInit(): void {
    // get user id
    // this.moneyService.getAccountBalance().subscribe((res) => {
    //   this.userId = res.userId;
    // });
    this.userId = 'e1f8ea09-52ff-40ca-a774-86955a7ba3a8';
  }

  add(): void {
    //Add new IRA Fund
    this.newIra = {
      name: this.name,
      balance: 0,
      type: this.selectedValue,
      userId: this.userId,
      mutualFundId: null,
      etfId: null,
      stockId: null,
    };
    console.log('newIra', this.newIra);
    this.fundService.addIra(this.newIra).subscribe();
    //window.location.reload();
  }
}
