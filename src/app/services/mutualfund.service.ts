import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MutualfundService {
  readonly URL;
  readonly fundURL;
  readonly historicalData;
  constructor(private http: HttpClient) {
    this.fundURL =
      'https://mysterious-dawn-78553.herokuapp.com/https://financialmodelingprep.com/api/v3/quote';
    this.URL =
      'https://mysterious-dawn-78553.herokuapp.com/https://mutualfunds.herokuapp.com/currentMutualFunds/redis';
    this.historicalData = `https://mysterious-dawn-78553.herokuapp.com/https://financialmodelingprep.com/api/v3/historical-chart/4hour`;
  }

  getFunds(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  getFund(symbol: string): Observable<any> {
    return this.http.get(
      `${this.fundURL}/${symbol}?apikey=dccf9329500f00a6e72e4bc4bc1a681b`
    );
  }

  getHistoricalData(symbol: string): Observable<any> {
    return this.http.get(
      `${this.historicalData}/${symbol}?apikey=dccf9329500f00a6e72e4bc4bc1a681b`
    );
  }
}
