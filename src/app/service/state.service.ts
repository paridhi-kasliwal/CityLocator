import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  server_url = environment.server_url;

  constructor(private httpClient: HttpClient) { }

  getStateList() {
    return this.httpClient.get(this.server_url + 'cities');
  }
}