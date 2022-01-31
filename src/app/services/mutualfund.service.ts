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
<<<<<<< HEAD
    this.fundURL =
      'https://mysterious-dawn-78553.herokuapp.com/https://mutualfunds.herokuapp.com/currentMutualFunds';
=======
    this.fundURL = 'https://financialmodelingprep.com/api/v3/quote';
>>>>>>> 5e4029d031a63a0c246333ffea3e0987e4b430a7
    this.URL =
<<<<<<< HEAD
      'https://mysterious-dawn-78553.herokuapp.com/https://mutualfunds.herokuapp.com/currentMutualFunds/redis';
=======
      'https://cors-anywhere.herokuapp.com/https://mutual-funds-db.herokuapp.com/currentMutualFunds/redis';
>>>>>>> fce5f2b443d0d03060c07dee9c298b054b530e81
    // this.URL = `https://financialmodelingprep.com/api/v3/quotes/mutual_fund?apikey=${process.env.PARAMKEY}`;

    this.historicalData = `https://financialmodelingprep.com/api/v3/historical-chart/4hour`;
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
