import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getCryptoPriceHistory(market, interval){
    // let onemonthago = new Date().getTime()-86400*31*1000;
    let intervalString = '';
    let previous = 0;
    switch (interval){
      case 0: intervalString = 'm1'; previous = new Date().getTime()-3600*1000; break;
      case 1: intervalString = 'm15';previous = new Date().getTime()-6*3600*1000;break;
      case 2: intervalString = 'h1';previous = new Date().getTime()-24*3600*1000;break;
      default : intervalString = 'd1';previous = new Date().getTime()-31*24*3600*1000;
    }
    
    let now = new Date().getTime();
    return this.http.get('https://api.coincap.io/v2/assets/' + market + '/history?interval=' + intervalString+ '&start=' + previous + '&end=' + now);
  }

  getCryptoComparePriceHistory(market, interval){
    
    let intervalString = '';
    switch (interval){
      case 0: 
      case 1: 
        intervalString = 'minute'; 
        break;
      case 2: 
        intervalString = 'hour'; 
        break;
      default : 
        intervalString = 'day';
    }
    return this.http.get('https://min-api.cryptocompare.com/data/histo' + intervalString + '?fsym=' + market+ '&tsym=USD&limit=40');
  }

  getMarketInfo(coin){
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/' + coin + '/?convert=USD');
    //  return this.http.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + coin + '&tsyms=USD');
    //return this.http.get('https://api.coincap.io/v2/assets/'+ market);
  }
}
