import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Delor } from '../delor.model';
import {
  state,
  style,
  transition,
  animate,
  trigger,
} from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delor',
  templateUrl: './delor.component.html',
  styleUrls: ['./delor.component.css'],
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
export class DelorComponent implements OnInit {
  delorResponseOg: Delor = {};
  cols = 2;
  ticker: string = '';
  startDate: string = '';
  endDate: string = '';
  investmentAmount = '';
  isEnlarge: boolean = false;
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
  onDelorInvestFormSubmit() {
    if (this.isEnlarge == false) {
      this.isEnlarge = true;
    }
    this.auth
      .getResultsDelor(
        this.ticker,
        this.startDate,
        this.endDate,
        this.investmentAmount
      )
      .subscribe((payload) => {
        this.delorResponseOg = payload;
        if (this.delorResponseOg.endInvestmentValue == 'NaN') {
          this.delorResponseOg.endInvestmentValue =
            'Invalid Dates, Holiday or Weekend Selected';
        }
      });
  }
}
