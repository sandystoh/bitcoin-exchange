import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, flatMap, toArray } from 'rxjs/operators';

export const API = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/all';
// ?crypto=BTC&fiat=SGD';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  getPrice() {
    const headers = new HttpHeaders().set('X-testing', 'testing');
    const params = new HttpParams()
    .set('crypto', 'BTC')
    .set('fiat', 'SGD');

    return this.http.get<any>(API, {params, headers})
    .pipe(
      map(res => ({ask: res.BTCSGD.ask, bid: res.BTCSGD.bid}))
  ).toPromise();
  }
}
