import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EtfService {
  public ETF_API_URL = `https://mysterious-dawn-78553.herokuapp.com/https://obscure-oasis-94568.herokuapp.com/etfs/etf`;
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

  public getEtfs(): Observable<any> {
    let apiResponse = this.httpClient.get(this.ETF_API_URL);
    return apiResponse;
  }
}
