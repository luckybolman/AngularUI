import { Injectable } from '@angular/core';

export class AppConstants {
  public static get baseURL(): string { return "http://localhost:8000"; }
}

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
  getDataFromSymbol(symbol) {
    for(let i=0; i<this.data.length; i++) {
      if(this.data[i].symbol == symbol)
        return this.data[i];
    }
  }

  data = [
    {
      name:'Bitcoin',
      symbol:'BTC',
      market:'bitcoin',
      color:'#ea9914',
      icon:'./assets/BTC_Logo.png',
      description:'Bitcoin uses peer-to-peer technology to operate with no central authority or banks. Managing transactions,and the issuing of bitcoins,is carried out collectively by the network.',
      checked: true,
      price : 0,
      cap : 0,
      volumn24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
    },
    {
      name:'Ethereum',
      symbol:'ETH',
      market:'ethereum',
      color:'#627eea',
      icon:'./assets/ETH_Logo.png',
      description:'Ethereum is a decentralized platform that runs smart contracts:applications that run exactly as programmed without any possibility of downtown,censorship,fraud or third party interference.',
      checked: true,
      price : 0,
      cap : 0,
      volumn24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
    },
    {
      name:'Litecoin',
      symbol:'LTC',
      market:'litecoin',
      color:'#989898',
      icon:'./assets/LTC_Logo.png',
      description:'Litecoin provides fast,2.5 minute transaction confirmations and uses scrypt-based proof-of-work to target everyday computers.Litecoin is often considered the silver to Bitcoin gold.',
      checked: true,
      price : 0,
      cap : 0,
      volumn24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
    },
    {
      name:'MobilinkToken',
      symbol:'MOLK',
      market:'mobilinktoken',
      color:'#153281',
      icon:'./assets/MOLK_Logo.png',
      description:'',
      checked: true,
      price : 0,
      cap : 0,
      volumn24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
    }
    /*{
      name:'Bitcoin Cash',
      symbol:'BCH',
      market:'bitcoin cash',
      color:'#8dc351',
      icon:'./assets/bitcoin_cash_logo.png',
      description:'Bitcoin Cash is a hard-forked version of Bitcoin. It is similar to the Bitcoin protocol,however differences are defined in blocksize limits and difficulty adjustments.',
      checked: false,
      price : 0,
      cap : 0,
      volumn24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
    },
    {
      name:'Dash',
      symbol:'DASH',
      market:'dash',
      color:'#1c75bc',
      icon:'./assets/dashcoin_logo.png',
      description:'DASH aims to be privacy-centric with unlinkable transactions using the PrivateSend System.Blockchain governance is carried out via MasterNode system.',
      checked: true,
      price : 0,
      cap : 0,
      volumn24 : '',
      change24 : 0,
      balance : 0,
      value : 0,
      portfolio : 0,
      min : 0,
      hover: false,
      hover1 : false,
    }*/    
  ]
}