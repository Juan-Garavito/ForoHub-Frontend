import { PayloadToken } from './login.definitions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  urlBase : string;

  constructor(private httpClient : HttpClient, private configService : ConfigService) {
    this.urlBase = this.configService.getBaseUrl();
   }

  login(correo: string, contraseña: string) : Observable<any> {
    return this.httpClient.post(`${this.urlBase}/login`, {correo, contraseña})
    .pipe(tap((response: any) => {
      console.log(response);
      this.setToken(response.token);
    }));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  isAuthenticaded() : boolean {
    const token = this.getToken();
    if(token == null){
      return false;
    }

    const payload: PayloadToken = JSON.parse(atob(token.split('.')[1]));
    const expiracion = payload.exp * 1000;
    return Date.now() < expiracion;
  }
}
