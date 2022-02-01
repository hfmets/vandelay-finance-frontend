import { FundsComponent } from './funds/funds.component';
import { EtfsComponent } from './etfs/etfs.component';
import { StocksComponent } from './stocks/stocks.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { IraComponent } from './ira/ira.component';
import { EztraderComponent } from './eztrader/eztrader.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'mutualFunds', component: FundsComponent },
  { path: 'etfFunds', component: EtfsComponent },
  { path: 'ira', component: IraComponent },
  { path: 'news', component: NewsfeedComponent },
  { path: 'eztrader', component: EztraderComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
