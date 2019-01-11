import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo {
  bLogined: boolean = false;
  username: string = '';
}

@Injectable()
export class MarketInfo {
  coin_prices = {
    'BTC' : 0,
    'ETH' : 0,
    'LTC' : 0,
    'MOLK' : 0,
  };

  market_rate: number = 0;
}

export class AppConstants {
  public static get baseURL(): string { return "http://localhost:8000"; }
}