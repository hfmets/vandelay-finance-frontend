import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ira } from '../ira/ira.model';
import { MatDialog } from '@angular/material/dialog';
import { IraService } from '../services/ira.service';
import { FundsModalComponent } from '../funds-modal/funds-modal.component';
import { AddIraComponent } from '../add-ira/add-ira.component';

// groupBy name and type
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
  selector: 'app-ira-account',
  templateUrl: './ira-account.component.html',
  styleUrls: ['./ira-account.component.css'],
})
export class IraAccountComponent implements OnInit, OnDestroy {
  amount: number = 0;
  symbol: string = '';
  iras: Ira[] = [];
  tempIraTypeList: string[] = [];
  dataSource: any[] = [];
  new_data: any[] = [];
  userId = 7;
  displayedColumns: string[] = ['name', 'balance'];

  private irasSub: Subscription = new Subscription();

  constructor(private iraService: IraService, private dialog: MatDialog) {}

  ngOnInit(): void {
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

        //group each ira by Ira type and Ira name
        this.new_data = groupBy(
          this.iras,
          function (item: { type: any; name: any }) {
            return [item.type, item.name];
          }
        );
        // get name value and type value for each group
        Object.entries(this.new_data).forEach(([key, value]) => {
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
        //console.log('dataSource1', this.dataSource);
      },
    });
  }

  openModal(fund: any) {
    const dialogRef = this.dialog.open(FundsModalComponent, {
      height: '600px',
      width: '1000px',
      data: {
        ira_name: fund.name,
        ira_type: fund.type,
      },
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

  buyIra(amount: number) {
    //update ira account
    console.log('amount', typeof amount);
  }

  ngOnDestroy() {
    this.irasSub.unsubscribe();
  }
}
