import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Inject,
} from '@angular/core';
import { MutualfundService } from '../services/mutualfund.service';
import { Fund } from '../funds/fund.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FundComponent } from '../fund/fund.component';
import { MatDialog } from '@angular/material/dialog';
import { BuyIraComponent } from '../buy-ira/buy-ira.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-funds-modal',
  templateUrl: './funds-modal.component.html',
  styleUrls: ['./funds-modal.component.css'],
})
export class FundsModalComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private fundService: MutualfundService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: string
  ) {}

  funds!: MatTableDataSource<Fund>;
  displayedColumns: string[] = ['name', 'symbol', 'price', 'add'];
  iraName: string = '';
  iraType: string = '';

  ngOnInit(): void {
    //data passed from IraAccountComponent
    let s = Object.values(this.data);
    console.log('s', s[0]);
    this.iraName = s[0];
    this.iraType = s[1];

    this.fundService.getFunds().subscribe({
      next: (res) => {
        let resArr = Object.keys(res).map((key) => {
          return res[key];
        });
        resArr = resArr.slice(0, -2);
        let funds: Fund[] = resArr.map((item) => {
          return {
            symbol: item.symbol,
            name: item.name,
            price: item.price,
          };
        });
        this.funds = new MatTableDataSource<Fund>(funds);
        this.funds.paginator = this.paginator;
        this.funds.sort = this.sort;

        console.log('funds', this.funds);
      },
    });
    //console.log('2', this.dataSource);
  }

  openModal(symbol: string) {
    // let dialogRef =
    this.dialog.open(FundComponent, {
      height: '600px',
      width: '1000px',
      data: {
        symbol: symbol,
      },
    });
  }

  applyFilter(filterValue: string) {
    this.funds.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {}

  //update ira with mutual fund
  addMutualFund(symbol: string) {
    console.log('added');
    this.dialog.open(BuyIraComponent, {
      height: '250px',
      width: '300px',
      data: {
        symbol: symbol,
        ira_name: this.iraName,
        ira_type: this.iraType,
      },
    });
  }
}
