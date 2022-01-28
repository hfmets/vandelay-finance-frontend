import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MutualfundService } from '../services/mutualfund.service';
import { Fund } from '../funds/fund.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css'],
})
export class FundsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private fundService: MutualfundService) {}

  //console.log(dataSource);
  funds!: MatTableDataSource<Fund>;
  displayedColumns: string[] = ['name', 'symbol', 'price'];

  ngOnInit(): void {
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

  ngAfterViewInit(): void {}
}
