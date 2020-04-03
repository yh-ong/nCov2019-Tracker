import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  API_URL = "https://pomber.github.io/covid19/timeseries.json";

  constructor(private http: HttpClient) { }

  getData(API_URL: string) {
    return this.http.get(API_URL);
  }
}
