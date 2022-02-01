import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fund } from '../funds/fund.model';

@Injectable({
  providedIn: 'root',
})
export class MutualfundService {
  readonly URL;
  readonly fundURL;
  readonly historicalData;
  readonly iraURL;
  constructor(private http: HttpClient) {
    this.fundURL =
      'https://mysterious-dawn-78553.herokuapp.com/https://mutualfunds.herokuapp.com/currentMutualFunds';
    this.fundURL =
      'https://mysterious-dawn-78553.herokuapp.com/https://financialmodelingprep.com/api/v3/quote';
    this.URL =
      'https://mysterious-dawn-78553.herokuapp.com/https://mutualfunds.herokuapp.com/currentMutualFunds/redis';
    // this.URL = `https://financialmodelingprep.com/api/v3/quotes/mutual_fund?apikey=${process.env.PARAMKEY}`;

    this.historicalData = `https://mysterious-dawn-78553.herokuapp.com/https://financialmodelingprep.com/api/v3/historical-chart/4hour`;
    this.iraURL =
      'https://mysterious-dawn-78553.herokuapp.com/https://ira-funds.herokuapp.com/iras/';
  }

  getFunds(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  getFund(symbol: string): Observable<any> {
    return this.http.get(`${this.fundURL}/${symbol}?apikey=`);
  }

  getHistoricalData(symbol: string): Observable<any> {
    return this.http.get(`${this.historicalData}/${symbol}?apikey=`);
  }
}
