import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ira } from './ira.model';
import {
  MatDialog,
  MAT_DIALOG_SCROLL_STRATEGY_FACTORY,
} from '@angular/material/dialog';
import { IraService } from '../services/ira.service';
import { FundsModalComponent } from '../funds-modal/funds-modal.component';
import { AddIraComponent } from '../add-ira/add-ira.component';
// import { AddIraComponent } from '../add-ira/add-ira.component';
// import { FundsModalComponent } from '../funds-modal/funds-modal.component';

// group by group of params
function groupBy(
  array: any[],
  f: { (item: { type: any; name: any }): any[]; (arg0: any): any }
) {
  var groups = <any>{};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    console.log('groups', groups[group]);
    return groups[group];
  });
}

@Component({
  selector: 'app-ira',
  templateUrl: './ira.component.html',
  styleUrls: ['./ira.component.css'],
})
export class IraComponent implements OnInit {
  amount: number = 0;
  symbol: string = '';
  checked = false;
  iras: Ira[] = [];
  tempIraTypeList: string[] = [];
  dataSource: any[] = [];
  new_data: any[] = [];
  userId = 7;
  displayedColumns: string[] = ['name', 'balance'];

  private irasSub: Subscription = new Subscription();

  constructor(private iraService: IraService, private dialog: MatDialog) {}

  ngOnInit(): void {
    //let id = 20;
    this.iraService.getIra(this.userId).subscribe({
      next: (res) => {
        //console.log('response', res);
        let resArr = Object.keys(res).map((key) => {
          //console.log('res[key]', res[key]);
          return res[key];
        });
        //console.log('resArr', resArr);
        let funds: Ira[] = resArr.map((item) => {
          return {
            balance: item.balance,
            name: item.name,
            type: item.type,
            id: item.id,
            userId: item.userId,
            mutualFundId: item.mutualFundId,
            stockId: item.stockId,
            etfId: item.etfId,
          };
        });

        //console.log('Fund Payload ', payload);
        this.iras = funds;
        console.log('payload', this.iras);

        //group each ira by type and name
        this.new_data = groupBy(
          this.iras,
          function (item: { type: any; name: any }) {
            return [item.type, item.name];
          }
        );
        //this.new_data = groupedBy(this.iras, 'type');
        //console.log('groupedby array1', new_data1);
        console.log('groupedby array2', this.new_data);
        //return this.new_data;
        //this.dataSource = new_data;
        //console.log('dataSource', this.dataSource);

        Object.entries(this.new_data).forEach(([key, value]) => {
          //for each key, get the type and name
          //console.log('key', key);
          //console.log('value', value);
          //console.log('len', value.length);
          let types = [];
          let names = [];
          for (let i = 0; i < 1; i++) {
            //console.log('type', value[i].type);
            //console.log('name', value[i].name);
            types.push(value[i].type);
            names.push(value[i].name);
          }
          // value.forEach((v) => {
          //   console.log('type', v.type);
          //   console.log('name', v.name);
          // });
          //console.log('datas1', this.dataSource);
          for (let i = 0; i < types.length; i++) {
            this.dataSource.push({
              name: names[i],
              type: types[i],
              isGroupBy: true,
            });
          }
          let values = this.new_data[<any>key];
          values.forEach((item: any) => {
            this.dataSource.push({ item, isGroupBy: false });
          });
        });

        console.log('dataSource1', this.dataSource);
      },
    });
    console.log('data2', this.dataSource);
  }

  openModal(fund: any) {
    //this.checked1 = !this.checked1;
    //console.log('this.checked', this.checked1);
    const dialogRef = this.dialog.open(FundsModalComponent, {
      height: '600px',
      width: '1000px',
    });

    //gets added mutual fund symbol
    dialogRef.componentInstance.onAdd.subscribe((result) => {
      this.symbol = result;
      //create ira account with mutualFund Symbol
      //fund.name
      //fund.type
      let new_ira = {
        name: fund.name,
        balance: 0,
        type: fund.type,
        userId: this.userId,
        mutualFundId: this.symbol,
        etfId: null,
        stockId: null,
      };
      this.iraService.addIra(new_ira).subscribe();
      console.log('symbol added', this.symbol);
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('symbol2', this.symbol);
      window.location.reload();
    });
  }

  addIraModal(): void {
    this.dialog.open(AddIraComponent);
  }

  isGroup(item: any): boolean {
    console.log('isGrp', item.isGroupBy);
    if (item.isGroupBy == true) {
      return item.isGroupBy;
    } else {
      return false;
    }
  }

  addMoney() {
    this.checked = !this.checked;
  }

  ngOnDestroy() {
    this.irasSub.unsubscribe();
  }
}
