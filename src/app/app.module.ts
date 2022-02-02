import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { StocksComponent } from './stocks/stocks.component';
import { FundsComponent } from './funds/funds.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { BuyStocksDialogComponent } from './buy-stocks-dialog/buy-stocks-dialog.component';
import { FormsModule } from '@angular/forms';
import { VisualComponent } from './visual/visual/visual.component';
import { TableComponent } from './visual/table/table/table.component';
import { GraphComponent } from './visual/graph/graph/graph.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { FundComponent } from './fund/fund.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EtfsComponent } from './etfs/etfs.component';
import { WalletComponent } from './wallet/wallet.component';
import { AddFundsDialogComponent } from './add-funds-dialog/add-funds-dialog.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SellHoldingsDialogComponent } from './sell-holdings-dialog/sell-holdings-dialog.component';
import { IraComponent } from './ira/ira.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FundsModalComponent } from './funds-modal/funds-modal.component';
import { AddIraComponent } from './add-ira/add-ira.component';
import { DisclosureComponent } from './disclosure/disclosure.component';
import { BuyMutualFundsDialogComponent } from './buy-mutual-funds-dialog/buy-mutual-funds-dialog.component';

import { HorizontalComponent } from './visual/horizontalGraph/horizontal/horizontal.component';

import { EztraderComponent } from './eztrader/eztrader.component';
import { BuyEtfDialogComponent } from './buy-etf-dialog/buy-etf-dialog.component';
import { EztraderdashboardComponent } from './eztraderdashboard/eztraderdashboard.component';
import { IraTypesComponent } from './ira-types/ira-types.component';
import { DelorComponent } from './delor/delor.component';
import { IraAccountComponent } from './ira-account/ira-account.component';
import { BuyIraComponent } from './buy-ira/buy-ira.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    StocksComponent,
    FundsComponent,
    HomeComponent,
    NewsfeedComponent,
    BuyStocksDialogComponent,
    FundComponent,
    EtfsComponent,
    WalletComponent,
    AddFundsDialogComponent,
    MyAccountComponent,
    SellHoldingsDialogComponent,
    IraComponent,
    VisualComponent,
    TableComponent,
    GraphComponent,
    FundsModalComponent,
    AddIraComponent,
    DisclosureComponent,
    BuyMutualFundsDialogComponent,
    HorizontalComponent,
    EztraderComponent,
    BuyEtfDialogComponent,
    EztraderdashboardComponent,
    IraTypesComponent,
    DelorComponent,
    IraAccountComponent,
    BuyIraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatChipsModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    MatSortModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
