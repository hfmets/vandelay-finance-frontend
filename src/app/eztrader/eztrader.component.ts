import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  state,
  style,
  transition,
  animate,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-eztrader',
  templateUrl: './eztrader.component.html',
  styleUrls: ['./eztrader.component.css'],
  animations: [
    trigger('enlarge', [
      state(
        'start',
        style({
          opacity: 0,
        })
      ),
      state(
        'end',
        style({
          opacity: 1,
        })
      ),
      transition('start => end', [animate('1s')]),
      transition('end => start', [animate('1s')]),
    ]),
  ],
})
export class EztraderComponent implements OnInit {
  cols = 2;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 10;
  isEnlarge: boolean = false;
  ticker: string = '';
  tickerResult: string = '';
  ezTraderResult: any = {
    ticker: 'GOOG',
    buy: true,
    sell: false,
    weak: true,
    strong: false,
  };
  action: string = '';
  strength: string = '';

  constructor(
    private auth: AuthService,
    private responsive: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.WebLandscape,
        Breakpoints.WebPortrait,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        } else if (breakpoints[Breakpoints.WebPortrait]) {
          this.cols = 2;
        } else if (breakpoints[Breakpoints.WebLandscape]) {
          this.cols = 2;
        } else {
          this.cols = 2;
        }
      });
  }
  onEZFormSubmit() {
    if (this.isEnlarge == false) {
      this.isEnlarge = true;
    }
    this.auth.getEZTrader(this.ticker).subscribe((payload) => {
      this.ezTraderResult = payload;
      if (
        this.ezTraderResult.buy == true &&
        this.ezTraderResult.strong == true
      ) {
        this.color = 'primary';
        this.value = Math.floor(Math.random() * (100 - 75) + 75);
        this.action = 'BUY';
        this.strength = 'STRONG';
      } else if (
        this.ezTraderResult.buy == true &&
        this.ezTraderResult.strong == false
      ) {
        this.color = 'primary';
        this.value = Math.floor(Math.random() * (75 - 52) + 52);
        this.action = 'BUY';
        this.strength = 'WEAK';
      } else if (
        this.ezTraderResult.buy == false &&
        this.ezTraderResult.strong == true
      ) {
        this.color = 'warn';
        this.value = Math.floor(Math.random() * (100 - 75) + 75);
        this.action = 'SELL';
        this.strength = 'STRONG';
      } else if (
        this.ezTraderResult.buy == false &&
        this.ezTraderResult.strong == false
      ) {
        this.color = 'warn';
        this.value = Math.floor(Math.random() * (75 - 52) + 52);
        this.action = 'SELL';
        this.strength = 'WEAK';
      } else if (this.ezTraderResult.buy == null) {
        this.ezTraderResult.action = 'Invalid Ticker';
        this.value = 0;
        this.tickerResult = 'Invalid Ticker';
        return;
      }
      console.log(this.ezTraderResult);
    });
    //this.ticker = this.ticker.toUpperCase()
    this.tickerResult = this.ticker.toUpperCase();
  }
  // isHandset$: Observable<boolean> = this.breakpointObserver
  //   .observe(Breakpoints.Handset)
  //   .pipe(
  //     map((result) => result.matches),
  //     shareReplay()
  //   );
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 4 },
  //       ];
  //     }

  //     return [
  //       { title: 'STOCKS', cols: 1, rows: 1 },
  //       { title: 'NEWS', cols: 1, rows: 5 },
  //       { title: 'Bill Reminder', cols: 1, rows: 3 },
  //     ];
  //   })
  // );
}
