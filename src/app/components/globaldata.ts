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

  market_refresh_interval: any;

}

@Injectable()
export class CoinInfo {
  data = [
    {
      'name':'Bitcoin',
      'symbol':'BTC',
      'color':'#ea9914',
      'icon':'./assets/BTC_Logo.png',
      'description':'Bitcoin uses peer-to-peer technology to operate with no central authority or banks. Managing transactions,and the issuing of bitcoins,is carried out collectively by the network.',
      'checked': true
    },
    {
      'name':'Ethereum',
      'symbol':'ETH',
      'color':'#627eea',
      'icon':'./assets/ethereum.png',
      'description':'Ethereum is a decentralized platform that runs smart contracts:applications that run exactly as programmed without any possibility of downtown,censorship,fraud or third party interference.',
      'checked': true
    },
    {
      'name':'Litecoin',
      'symbol':'LTC',
      'color':'#989898',
      'icon':'./assets/LTC_Logo.png',
      'description':'Litecoin provides fast,2.5 minute transaction confirmations and uses scrypt-based proof-of-work to target everyday computers.Litecoin is often considered the silver to Bitcoin gold.',
      'checked': true
    },
    {
      'name':'MobilinkToken',
      'symbol':'MOLK',
      'color':'#153281',
      'icon':'./assets/MOLK_Logo.png',
      'description':'',
      'checked': true
    }
    /*{
      'name':'Bitcoin Cash',
      'symbol':'BCH',
      'color':'#8dc351',
      'icon':'./assets/bitcoin_cash_logo.png',
      'description':'Bitcoin Cash is a hard-forked version of Bitcoin. It is similar to the Bitcoin protocol,however differences are defined in blocksize limits and difficulty adjustments.',
      'checked': false
    },
    {
      'name':'Dash',
      'symbol':'DASH',
      'color':'#1c75bc',
      'icon':'./assets/dashcoin_logo.png',
      'description':'DASH aims to be privacy-centric with unlinkable transactions using the PrivateSend System.Blockchain governance is carried out via MasterNode system.',
      'checked': true
    }*/    
  ]
}


export class AppConstants {
  public static get baseURL(): string { return "http://localhost:8000"; }
}