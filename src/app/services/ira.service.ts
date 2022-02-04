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
      'https://mysterious-dawn-78553.herokuapp.com/https://iras-db.herokuapp.com/iras';
  }

  getIra(id: string): Observable<any> {
    return this.http.get(`${this.iraURL}/${id}`);
  }

  addIra(ira: any): Observable<any> {
    return this.http.post(`${this.iraURL}`, ira);
  }
}
