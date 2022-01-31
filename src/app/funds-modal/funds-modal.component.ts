import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MutualfundService } from '../services/mutualfund.service';
import { Fund } from '../funds/fund.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  constructor(private fundService: MutualfundService) {}

  funds!: MatTableDataSource<Fund>;

  //console.log(dataSource);
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'symbol', 'price', 'add'];

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {}
}
