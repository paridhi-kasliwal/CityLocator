import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  server_url = environment.server_url;

  constructor(private httpClient: HttpClient) { }

  getStateList(state?) {
    let params;
    if (state) {
      params = new HttpParams()
      .set('State', state);
    }
    return this.httpClient.get(this.server_url + 'cities', {params});
  }
}