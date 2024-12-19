import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly urlBase: string = 'http://localhost:8080';

  getBaseUrl(): string {
    return this.urlBase;
  }
}
