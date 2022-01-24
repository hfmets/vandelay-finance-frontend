import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = 'http://localhost:3333/api/users/';

  private loggedIn = new Subject<boolean>();

  logInChange$ = this.loggedIn.asObservable();

  emitLoginChange(change: any) {
    this.loggedIn.next(change);
  }

  constructor(private http: HttpClient) {}

  signUp(body: any): Observable<any> {
    return this.http.post<any>(this.authUrl, body, { withCredentials: true });
  }
}
