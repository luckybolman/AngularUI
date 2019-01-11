import { Component, OnInit } from '@angular/core';
import { MarketInfo } from '../globaldata';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  step = 0;
  coin_rates = {
    'BTCETH' : 31.64900250,
    'BTCLTC' : 124.09113741,
    'BTCMOLK' : 464652.31835909,
    'ETHBTC' : 0.03049705,
    'ETHLTC' : 3.81165478,
    'ETHMOLK' : 14660.94178824,
    'LTCBTC' : 	0.00804210,
    'LTCETH' : 0.25464628,
    'LTCMOLK' : 3763.65304058,
    'MOLKBTC' : 0.00000211,
    'MOLKETH' : 0.00006764,
    'MOLKLTC' : 0.00026399
  }
  coin_data = [
    { 
      buttonColor : '#ea9914',
      selectedIcon : "./assets/BTC_Logo.png",
      name : 'BTC',
      long : 'Bitcoin',
      balance : 0.00,
      //rate : 0.00,
      min : 0.00,
      hover: false,
      hover1 : false,
    },
    {
      buttonColor : '#7d8fe8',
      selectedIcon : "./assets/ETH_Logo.png",
      name : 'ETH',
      long : 'Ethereum',
      balance : 0.00,
      //rate : 0.00,
      min : 0.16698473,
      hover : false,
      hover1 : false,
    },
    {
      buttonColor : '#989898',
      selectedIcon : "./assets/LTC_Logo.png",
      name : 'LTC',
      long : 'Litecoin',
      balance : 0.00,
      //rate : 0.00,
      min : 0.64951131,
      hover : false,
      hover1 : false,
    },
    {
      buttonColor : '#ea7070',
      selectedIcon : "./assets/MOLK_Logo.png",
      name : 'MOLK',
      long : 'MobilinkToken',
      balance : 0.00,
      //rate : 0.00,
      min : 20,
      hover : false,
      hover1 : false,
    },
  ];
  sendCoin = 0;
  receiveCoin = 1;
  sendingAmountC = '0.00';
  sendingAmountU = '0.00';
  receivingAmountC = '0.00'; 
  receivingAmountU = '0.00';
  
  constructor(
    public marketInfo: MarketInfo
  ) {}

  // cryptFormControl = new FormControl('',[Validators.required,Validators.email]);
  // useFormControl = new FormControl('',[Validators.required,Validators.email]);
  errorMessage : string = '';
  ngOnInit() {
  }

  setSendCoin(i : number) {
    if(i!=this.receiveCoin){
      this.sendCoin = i;
    }
    this.receivingAmountC = '0.00'; 
    this.receivingAmountU = '0.00';
    this.sendingAmountU = '0.00';
    this.sendingAmountC = '0.00';
    this.checkError();
  }
  setReceiveCoin(i : number){
    if(i!=this.sendCoin){
      this.receiveCoin = i;
    }
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.coin_data[this.sendCoin].name, this.coin_data[this.receiveCoin].name));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.receiveCoin].name]);
  }
  updateReceiveC(){
    if(!this.receivingAmountU || !parseFloat(this.receivingAmountU)){
      this.receivingAmountC = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00';
      return;
    } 
    this.receivingAmountC = this.formalize(parseFloat(this.receivingAmountU)/this.marketInfo.coin_prices[this.coin_data[this.receiveCoin].name]);
    this.sendingAmountC = this.formalize(parseFloat(this.receivingAmountC)/this.getCoinsRate(this.coin_data[this.sendCoin].name, this.coin_data[this.receiveCoin].name));
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.sendCoin].name]);
    this.checkError();
  }
  updateReceiveU(){
    if(!this.receivingAmountC || !parseFloat(this.receivingAmountC)){
      this.receivingAmountU = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00'; 
      return;
    } 
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.receiveCoin].name]);
    this.sendingAmountC = this.formalize(parseFloat(this.receivingAmountC)/this.getCoinsRate(this.coin_data[this.sendCoin].name, this.coin_data[this.receiveCoin].name));
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.sendCoin].name]);
    this.checkError();
    
  }
  updateSendC(){
    if(!this.sendingAmountU || !parseFloat(this.sendingAmountU)){
      this.sendingAmountC = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountC = this.formalize(parseFloat(this.sendingAmountU)/this.marketInfo.coin_prices[this.coin_data[this.sendCoin].name]);
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.coin_data[this.sendCoin].name, this.coin_data[this.receiveCoin].name));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.receiveCoin].name]);
    this.checkError();
  }
  updateSendU(){
    if(!this.sendingAmountC || !parseFloat(this.sendingAmountC)){
      this.sendingAmountU = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.sendCoin].name]);
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.coin_data[this.sendCoin].name, this.coin_data[this.receiveCoin].name));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.marketInfo.coin_prices[this.coin_data[this.receiveCoin].name]);
    this.checkError();
  }

  checkError(){
    if(parseFloat(this.sendingAmountC)>this.coin_data[this.sendCoin].balance) this.errorMessage = 'Not enough ' + this.coin_data[this.sendCoin].long + ' to start this transaction';
    else this.errorMessage = '';
  }

  setAllAmount(){
    this.sendingAmountC = this.formalize(this.coin_data[this.sendCoin].balance);
    this.updateSendU();
  }
  setHalfAmount(){
    this.sendingAmountC = this.formalize(this.coin_data[this.sendCoin].balance/2);
    this.updateSendU();
  }
  setMinAmount(){
    this.sendingAmountC = this.formalize(this.coin_data[this.sendCoin].min);
    this.updateSendU();
  }

  formalize(num : number){
    let str = "" + num;
    let index = str.indexOf('.');

    if (index >= 0 && (str.length - index - 1) > 2) {
      return this.eraseZeros(num.toFixed(8));
    } else {
      return num.toFixed(2);
    }
  }

  eraseZeros(num : string){
    return parseFloat(num).toString();
  }

  startExchange(){
    this.step = 1;
    console.log('start exchange');
    let inteval = setInterval(() => {
      this.step ++;
      if(this.step==3) clearInterval(inteval);
    }, 5000);
  }

  getCoinsRate(coin1 : any, coin2 : any) {
    if(coin1 != coin2 && this.marketInfo.coin_prices[coin2] && this.marketInfo.market_rate) {
      let rate = 1 - this.marketInfo.market_rate / 100;
      rate = this.marketInfo.coin_prices[coin1] / this.marketInfo.coin_prices[coin2] * rate;
      return parseFloat(rate.toFixed(8));
    } else {
      return 0;
    }
  }

  endExchange(){
    this.step = 0;
  }
  changeStyle($event,i){
    if(i!=this.sendCoin)
    this.coin_data[i].hover = $event.type == 'mouseover';
  }
  changeStyle1($event,i){
    if(i!=this.receiveCoin)
    this.coin_data[i].hover1 = $event.type == 'mouseover';
  }
  onClickComapreArrow() {
    let index = this.sendCoin;
    this.sendCoin = this.receiveCoin;
    this.receiveCoin = index;
    this.receivingAmountC = '0.00'; 
    this.receivingAmountU = '0.00';
    this.sendingAmountU = '0.00';
    this.sendingAmountC = '0.00';
    this.checkError();
  } 
}
