import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  stockUrl: string = 'https://financialmodelingprep.com/api/v3/quote-short/';

  stocksUrl: string =
    'https://mysterious-dawn-78553.herokuapp.com/https://obscure-oasis-94568.herokuapp.com/stocks/stocks';

  fundUrl: string = 'https://financialmodelingprep.com/api/v3/quote/';

  purchaseStockUrl: string = 'api/transactions/purchase';

  sellStockUrl: string = 'api/transactions/sell';

  getBalanceUrl: string = 'api/transactions/accountBalance';

  addFundsUrl: string = 'api/transactions/addFunds';

  accountInfoUrl: string = 'api/transactions/accountInfo';

  spendUrl: string = 'api/transactions/spend';

  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<any> {
    return this.http.get<any>(
      `${this.stockUrl}${ticker}?apikey=dccf9329500f00a6e72e4bc4bc1a681b`
    );
  }

  getStocks(): Observable<any> {
    return this.http.get<any>(this.stocksUrl);
  }

  getFund(ticker: string): Observable<any> {
    return this.http.get<any>(
      `${this.fundUrl}${ticker}?apikey=dccf9329500f00a6e72e4bc4bc1a681b`
    );
  }

  purchaseStock(reqBody: any): Observable<any> {
    return this.http.post<any>(
      environment.prefixFinances + this.purchaseStockUrl,
      reqBody,
      {
        withCredentials: true,
      }
    );
  }

  sellStock(reqBody: any): Observable<any> {
    return this.http.post<any>(
      environment.prefixFinances + this.sellStockUrl,
      reqBody,
      {
        withCredentials: true,
      }
    );
  }

  getAccountBalance(): Observable<any> {
    return this.http.get<any>(environment.prefixFinances + this.getBalanceUrl, {
      withCredentials: true,
    });
  }

  addFunds(reqBody: any): Observable<any> {
    return this.http.post<any>(
      environment.prefixFinances + this.addFundsUrl,
      reqBody,
      {
        withCredentials: true,
      }
    );
  }

  getAccountInfo(): Observable<any> {
    return this.http.get<any>(
      environment.prefixFinances + this.accountInfoUrl,
      { withCredentials: true }
    );
  }

  spend(fundsToBeSpent: number): Observable<any> {
    let reqBody = {
      fundsToBeSpent: fundsToBeSpent,
    };

    return this.http.post<any>(
      environment.prefixFinances + this.spendUrl,
      reqBody,
      { withCredentials: true }
    );
  }
}
