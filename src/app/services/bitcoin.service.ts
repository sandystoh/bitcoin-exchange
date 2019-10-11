import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, flatMap, toArray } from 'rxjs/operators';

export const API = 'https://cors-anywhere.herokuapp.com/https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=SGD';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  getPrice() {
    const headers = new HttpHeaders().set('X-testing', 'testing');

    return this.http.get<any>(API, {headers})
    .pipe(
      map(res => ({ask: res.BTCSGD.ask, bid: res.BTCSGD.bid}))
  ).toPromise();
  }
}
