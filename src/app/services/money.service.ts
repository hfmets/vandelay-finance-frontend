import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  tempStockUrl: string =
    'https://mysterious-dawn-78553.herokuapp.com/https://stocketfexpress.herokuapp.com/stocks/stock/api/';

  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<any> {
    return this.http.get<any>(this.tempStockUrl + ticker);
  }
}
