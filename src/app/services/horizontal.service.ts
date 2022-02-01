import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorizontalService {
  public INDEX_API_URL = `https://financialmodelingprep.com/api/v3/quotes/index?apikey=4848bbe794ce7941fcdce23f0a5aab37`;
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

   

  public getIndex(): Observable<any> {
    let apiResponse = this.httpClient.get(this.INDEX_API_URL)
    return apiResponse
  }
}
