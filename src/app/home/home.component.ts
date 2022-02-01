import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  signedIn!: boolean;
  constructor(
    private cookieService: CookieService,
    changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.signedIn = this.cookieService.check('connect.sid');
  }
}
