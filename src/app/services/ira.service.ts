import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IraService {
  readonly iraURL;
  constructor(private http: HttpClient) {
    this.iraURL =
      'https://cors-anywhere.herokuapp.com/https://ira-funds.herokuapp.com/iras/';
  }

  getIra(id: number): Observable<any> {
    return this.http.get(`${this.iraURL}/${id}`);
  }
}
