import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vandelay-finance-frontend';
  mobileQuery!: MediaQueryList;
  signedIn!: boolean;

  private _mobileQueryListener!: () => void;

  constructor(
    private cookieService: CookieService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private auth: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.auth.logInChange$.subscribe((value) => (this.signedIn = value));
  }

  ngOnInit() {
    this.signedIn = this.cookieService.check('connect.sid');
  }

  logout() {
    this.cookieService.delete('connect.sid', '/', '.vandelay-user.fun');
    this.auth.emitLoginChange(false);
    this.router.navigateByUrl('/home');
  }
}
