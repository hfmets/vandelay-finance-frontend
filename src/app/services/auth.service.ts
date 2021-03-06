import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = 'api/users/';

  private loggedIn = new Subject<boolean>();

  logInChange$ = this.loggedIn.asObservable();

  emitLoginChange(change: any) {
    this.loggedIn.next(change);
  }

  constructor(private http: HttpClient) {}

  signUp(body: any): Observable<any> {
    return this.http.post<any>(environment.prefixAuth + this.authUrl, body, {
      withCredentials: true,
    });
  }

  login(body: any): Observable<any> {
    return this.http.post<any>(
      environment.prefixAuth + this.authUrl + 'login',
      body,
      {
        withCredentials: true,
      }
    );
  }

  //these functions beloww should not be in the auth service, lazy coding on my part - Kaseem Stephenson
  getNews(){
    return this.http.get("https://mysterious-dawn-78553.herokuapp.com/https://stocknewsapi.com/api/v1/category?section=general&items=12&token=u5dsbsshi5vjxwphlv8bmtx7inniaunlkhb9fgmb")
  }
  getEZTrader(ticker:string){
    return this.http.get(
      'https://mysterious-dawn-78553.herokuapp.com/https://ez-trader-analysis.herokuapp.com/' +
        ticker
    );
  }
  getResultsDelor(ticker:string,startDate:string,endDate:string,investmentAmount:string): Observable<any> {
    const params = ticker + "/"+startDate+"/"+endDate+"/"+investmentAmount
    const url = "https://mysterious-dawn-78553.herokuapp.com/https://delorean-investing.herokuapp.com/" + params

    return this.http.get(url);

  }

}
