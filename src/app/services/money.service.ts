import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  stockUrl: string =
    'https://api.marketstack.com/v1/eod/latest?access_key=54b1c1a5b9ea427c6d17888d33b619aa&symbols=';

  stocksUrl: string =
    'https://mysterious-dawn-78553.herokuapp.com/https://obscure-oasis-94568.herokuapp.com/stocks/stocks';

  fundUrl: string = 'https://financialmodelingprep.com/api/v3/quote/';

  purchaseStockUrl: string = 'api/transactions/purchase';

  sellStockUrl: string = 'api/transactions/sell';

  getBalanceUrl: string = 'api/transactions/accountBalance';

  addFundsUrl: string = 'api/transactions/addFunds';

  accountInfoUrl: string = 'api/transactions/accountInfo';

  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<any> {
    return this.http.get<any>(`${this.stockUrl}${ticker}&limit=1`);
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
}
