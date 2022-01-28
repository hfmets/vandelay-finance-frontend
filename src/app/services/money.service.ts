import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  tempStockUrl: string =
    'https://mysterious-dawn-78553.herokuapp.com/https://stocketfexpress.herokuapp.com/stocks/stock/api/';
  stockUrl: string =
    'https://mysterious-dawn-78553.herokuapp.com/https://obscure-oasis-94568.herokuapp.com/stocks/get/stocks/tickers';
  purchaseStockUrl: string = 'http://localhost:3334/api/transactions/purchase';
  getBalanceUrl: string =
    'http://localhost:3334/api/transactions/accountBalance';

  addFundsUrl: string = 'http://localhost:3334/api/transactions/addFunds';

  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<any> {
    return this.http.get<any>(this.tempStockUrl + ticker);
  }

  getStocks(): Observable<any> {
    return this.http.get<any>(this.stockUrl);
  }

  purchaseStock(reqBody: any): Observable<any> {
    return this.http.post<any>(this.purchaseStockUrl, reqBody, {
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
}
