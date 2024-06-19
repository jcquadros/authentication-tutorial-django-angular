import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  api = 'http://localhost:8000/api';
  constructor( private http: HttpClient) { }

  forgot(body: any){
    return this.http.post(`${this.api}/forgot/`, body);
  }

  reset(body: any){
    return this.http.post(`${this.api}/reset/`, body);
  }
}
