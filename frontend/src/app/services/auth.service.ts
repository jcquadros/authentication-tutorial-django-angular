import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = 'http://localhost:8000/api';
  constructor( private http: HttpClient) { }
  static authEmitter = new EventEmitter<boolean>();

  register(body: any){
    return this.http.post(`${this.api}/register/`, body);
  }

  login(body: any){
    return this.http.post(`${this.api}/login/`, body, {withCredentials: true});
  }

  user(){
    return this.http.get(`${this.api}/user/`);
  }

  refresh(){
    return this.http.post(`${this.api}/refresh/`,{}, {withCredentials: true});
  }

  logout(){
    return this.http.post(`${this.api}/logout/`, {}, {withCredentials: true});
  }
}
