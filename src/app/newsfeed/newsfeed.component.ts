import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private responsive: BreakpointObserver
  ) {}
  news: any = [];
  cols = 3;
  rowHeight = '320px';

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
          this.cols = 3;
        } else {
          this.cols = 3;
        }
      });
    this.auth.getNews().subscribe((payload) => {
      this.news = payload;
      this.news = this.news.data;
      console.log(this.news);
    });
  }
}
