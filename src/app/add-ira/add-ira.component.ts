import { Component, OnInit } from '@angular/core';
import { IraService } from '../services/ira.service';
import { Ira } from '../ira/ira.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-ira',
  templateUrl: './add-ira.component.html',
  styleUrls: ['./add-ira.component.css'],
})
export class AddIraComponent implements OnInit {
  newIra: {} | undefined;
  iras: Ira[] = [];
  id: number = 0;
  userId: number = 22;
  name: string = '';
  balance: number = 0;
  type: string = '';
  amount: number = 0;
  ticker: string = '';
  form: FormGroup;

  constructor(
    private fundService: IraService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddIraComponent>
  ) {
    this.form = formBuilder.group({
      id: this.id,
      name: this.name,
      amount: this.amount,
      type: this.type,
      ticker: this.ticker,
      userId: this.userId,
    });
  }

  ngOnInit(): void {}

  add(): void {
    //Add new IRA Fund
    this.dialogRef.close();

    this.newIra = {
      id: this.id,
      name: this.name,
      type: this.type,
      userId: this.userId,
      balance: this.amount,
      mutualFundId: this.ticker,
      etfId: null,
      stockId: null,
    };

    console.log('New Fund ', this.newIra);
    this.fundService.addIra(this.newIra).subscribe();
    //this.fundsService.addFund(this.newIra).subscribe();
    //this.router.navigateByUrl(`/funds`);
    //call after subscription is complete
    //ADD CODE
    window.location.reload();
  }
}
