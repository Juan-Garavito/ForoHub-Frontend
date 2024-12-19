import { LoginService } from './../login/login.service';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayloadToken } from '../login/login.definitions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  urlBase : string;

  constructor(
    private configService : ConfigService,
    private httpClient : HttpClient) {
    this.urlBase = this.configService.getBaseUrl();
   }

  getPerfil(token: string) : Observable<any> {

    if (!token) {
      throw new Error('Token is null');
    }

    const payload : PayloadToken = JSON.parse(atob(token.split('.')[1]));
    const idUsuario = payload.id;
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.httpClient.get(`${this.urlBase}/usuario/${idUsuario}`, { headers: headers });
  }
}
