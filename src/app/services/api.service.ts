import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private SERVER_URL =
    'https://mysterious-dawn-78553.herokuapp.com/https://stocketfexpress.herokuapp.com/stocks/stock/api/';

  constructor(private httpClient: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert('PLEASE CLICK ANOTHER TICKER AND COMEBACK TO THIS ');
    return throwError(errorMessage);
  }

  public SET_TICKER: any;

  public getSingle() {
    //Default Ticker
    const ticker = 'AAPL';
    if (!this.SET_TICKER) {
      this.SET_TICKER = ticker;
    }
    const url = `${this.SERVER_URL}${this.SET_TICKER}`;
    console.log('what is the ticker', this.SET_TICKER);
    return this.httpClient.get(url).pipe(catchError(this.handleError));
  }

  public displayingColumns: string[] = [
    'open',
    'high',
    'low',
    'close',
    'volume',
    'adj_close',
    'split_factor',
    'dividend',
    'symbol',
    'exchange',
    'date',
  ];
}
