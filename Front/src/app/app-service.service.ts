import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://localhost:5500'
  }

  getData(){
    return this.http.get(`https://localhost:5500/authorize`);
  }

  checkConnection(){
    return this.http.get(`https://localhost:5500/checkAuthorize`);
  }

  getProducts(date: string){
    let params = new HttpParams().set("date", date);
    return this.http.get(`https://localhost:5500/products`, {params: params});
  }
}
