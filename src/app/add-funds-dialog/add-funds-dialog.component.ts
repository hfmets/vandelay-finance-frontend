import { WalletUpdateService } from './../services/wallet-update.service';
import { MoneyService } from './../services/money.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-funds-dialog',
  templateUrl: './add-funds-dialog.component.html',
  styleUrls: ['./add-funds-dialog.component.css'],
})
export class AddFundsDialogComponent implements OnInit {
  addFundsForm = new FormGroup({
    funds: new FormControl(0),
  });

  constructor(
    private moneyService: MoneyService,
    private dialogRef: MatDialogRef<AddFundsDialogComponent>,
    private walletUpdate: WalletUpdateService
  ) {}

  ngOnInit(): void {}

  submitForm() {
    const reqBody = {
      fundsToBeAdded: this.funds?.value,
    };

    this.moneyService.addFunds(reqBody).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.walletUpdate.changeWalletUpdate(true);
        this.dialogRef.close();
      },
    });
  }

  get funds() {
    return this.addFundsForm.get('funds');
  }
}
