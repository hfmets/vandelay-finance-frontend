import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ObjectUnsubscribedError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { StockElement } from 'src/app/models/stockTablePopUp';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns = this.getColumns();
  dataSource: any;
  stock: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSingle().subscribe((data) => {
      this.stock = data;
      this.dataSource = new MatTableDataSource<StockElement>(this.stock);
      this.dataSource.paginator = this.paginator;
    });
  }

  getColumns() {
    return this.apiService.displayingColumns;
  }
}

