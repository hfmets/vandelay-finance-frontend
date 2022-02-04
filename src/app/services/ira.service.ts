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

  getIra(id: any): Observable<any> {
    return this.http.get(`${this.iraURL}/id`, id);
  }

  addIra(ira: any): Observable<any> {
    return this.http.post(`${this.iraURL}`, ira);
  }

  updateIra(ira: any): Observable<any> {
    return this.http.patch(`${this.iraURL}/${ira.id}`, ira);
  }
}
