import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080/dados';

  constructor(private httpClient: HttpClient) { }

  data(page: number, size: number){
      return this.httpClient.get(this.baseUrl, {params: {page, size}});
  }

  dataByYear(page: number, size: number, ano: number, sort: string){
    return this.httpClient.get(`${this.baseUrl}/ano/${ano}`, {params: {page, size, sort}});
  }

  dataByCity(city: number) {
    return this.httpClient.get(`${this.baseUrl}/municipio/${city}`);
  }
}
