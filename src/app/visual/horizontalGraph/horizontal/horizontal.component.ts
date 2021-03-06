import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { HorizontalService } from 'src/app/services/horizontal.service';
import { HttpClient } from '@angular/common/http';
import { Index } from 'src/app/models/index';
import { interval, Subject, takeUntil, timer } from 'rxjs';

declare var google: any;
@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.css'],
})
export class HorizontalComponent implements OnInit, OnDestroy {
  dataSource: any;
  stock: any;
  index$: any;
  resArray: any[] = [];
  public unsubscribe$ = new Subject();
  displayedColumns = ['ticker', 'name', 'open', 'high', 'low', 'close', 'buy'];
  trend = ['trending_down', 'trending_flat', 'trending_up'];
  color = ['red', 'white', 'green'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private horizontalService: HorizontalService,
    private httpClient: HttpClient
  ) {}
  
  ngOnInit(): void {
    const observable = timer(0, 1000 * 39);
    observable.subscribe(() => {
      this.banner();
    });
  }
  
  banner() {
    this.horizontalService.getIndex()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((indexs) => {
      let responseArray = Object.keys(indexs).map((keys) => {
        return indexs[keys];
      });
      let res: Index[] = responseArray.map((eachIndex) => {
        let newSymbol = eachIndex.symbol;
        if (newSymbol[0] === '^') {
          newSymbol = newSymbol.slice(1);
        }
        let newTrend = 2;
        if (eachIndex.changesPercentage == 0.0) {
          newTrend = 1;
        } else if (eachIndex.changesPercentage < 0) {
          newTrend = 0;
        }
        return {
          symbol: newSymbol,
          name: eachIndex.name,
          price: eachIndex.price,
          changesPercentage: eachIndex.changesPercentage,
          trend: this.trend[newTrend],
          color: this.color[newTrend],
          change: eachIndex.change,
          exchange: eachIndex.exchange,
          open: eachIndex.open,
          previousClose: eachIndex.previousClose,
          timestamp: eachIndex.timestamp,
        };
      });
      this.resArray = res;
    });
    
    return this.index$;
  }
  ngOnDestroy(): void {
   this.unsubscribe$.next;
   this.unsubscribe$.complete();
  }
}
