import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  stockUrl: string =
    'https://api.marketstack.com/v1/eod/latest?access_key=54b1c1a5b9ea427c6d17888d33b619aa&symbols=';

  stocksUrl: string =
    'https://mysterious-dawn-78553.herokuapp.com/https://obscure-oasis-94568.herokuapp.com/stocks/get/stocks/tickers';

  purchaseStockUrl: string = 'http://localhost:3334/api/transactions/purchase';

  sellStockUrl: string = 'http://localhost:3334/api/transactions/sell';

  getBalanceUrl: string =
    'http://localhost:3334/api/transactions/accountBalance';

  addFundsUrl: string = 'http://localhost:3334/api/transactions/addFunds';

  accountInfoUrl: string = 'http://localhost:3334/api/transactions/accountInfo';

  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<any> {
    return this.http.get<any>(`${this.stockUrl}${ticker}&limit=1`);
  }

  getStocks(): Observable<any> {
    return this.http.get<any>(this.stocksUrl);
  }

  purchaseStock(reqBody: any): Observable<any> {
    return this.http.post<any>(this.purchaseStockUrl, reqBody, {
      withCredentials: true,
    });
  }

  sellStock(reqBody: any): Observable<any> {
    return this.http.post<any>(this.sellStockUrl, reqBody, {
      withCredentials: true,
    });
  }

  getAccountBalance(): Observable<any> {
    return this.http.get<any>(this.getBalanceUrl, { withCredentials: true });
  }

  addFunds(reqBody: any): Observable<any> {
    return this.http.post<any>(this.addFundsUrl, reqBody, {
      withCredentials: true,
    });
  }

  getAccountInfo(): Observable<any> {
    return this.http.get<any>(this.accountInfoUrl, { withCredentials: true });
  }
}
