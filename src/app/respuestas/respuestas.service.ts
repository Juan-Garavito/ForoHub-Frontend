import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(
      private configService : ConfigService,
      private httpClient : HttpClient) { }

  getRespuestas(token: string, idTopico: number) : Observable<any> {

    if (!token) {
      throw new Error('Token is null');
    }

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.httpClient.get(`${this.configService.getBaseUrl()}/respuesta/topico/${idTopico}`, {headers: headers});
  }
}
