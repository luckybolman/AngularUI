import { Component, OnInit } from '@angular/core';
import { MarketInfo, CoinInfo } from '../globaldata';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  step = 0;
  sendCoin = 0;
  receiveCoin = 1;
  sendingAmountC = '0.00';
  sendingAmountU = '0.00';
  receivingAmountC = '0.00'; 
  receivingAmountU = '0.00';
  coin_data: any;
  
  constructor(
    public marketInfo: MarketInfo,
    public coinInfo: CoinInfo
  ) {
  }

  // cryptFormControl = new FormControl('',[Validators.required,Validators.email]);
  // useFormControl = new FormControl('',[Validators.required,Validators.email]);
  errorMessage : string = '';
  ngOnInit() {
    this.coin_data = this.coinInfo.getCheckedCoins();
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
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.coin_data[this.sendCoin].price, this.coin_data[this.receiveCoin].price));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].price);
  }
  updateReceiveC(){
    if(!this.receivingAmountU || !parseFloat(this.receivingAmountU)){
      this.receivingAmountC = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00';
      return;
    } 
    this.receivingAmountC = this.formalize(parseFloat(this.receivingAmountU)/this.coin_data[this.receiveCoin].price);
    this.sendingAmountC = this.formalize(parseFloat(this.receivingAmountC)/this.getCoinsRate(this.coin_data[this.sendCoin].price, this.coin_data[this.receiveCoin].price));
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.coin_data[this.sendCoin].price);
    this.checkError();
  }
  updateReceiveU(){
    if(!this.receivingAmountC || !parseFloat(this.receivingAmountC)){
      this.receivingAmountU = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00'; 
      return;
    } 
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].price);
    this.sendingAmountC = this.formalize(parseFloat(this.receivingAmountC)/this.getCoinsRate(this.coin_data[this.sendCoin].price, this.coin_data[this.receiveCoin].price));
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.coin_data[this.sendCoin].price);
    this.checkError();
    
  }
  updateSendC(){
    if(!this.sendingAmountU || !parseFloat(this.sendingAmountU)){
      this.sendingAmountC = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountC = this.formalize(parseFloat(this.sendingAmountU)/this.coin_data[this.sendCoin].price);
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.coin_data[this.sendCoin].price, this.coin_data[this.receiveCoin].price));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].price);
    this.checkError();
  }
  updateSendU(){
    if(!this.sendingAmountC || !parseFloat(this.sendingAmountC)){
      this.sendingAmountU = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountU = this.formalize(parseFloat(this.sendingAmountC)*this.coin_data[this.sendCoin].price);
    this.receivingAmountC = this.formalize(parseFloat(this.sendingAmountC)*this.getCoinsRate(this.coin_data[this.sendCoin].price, this.coin_data[this.receiveCoin].price));
    this.receivingAmountU = this.formalize(parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].price);
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

  getCoinsRate(price1 : any, price2 : any) {
    if(price2 && this.marketInfo.market_rate) {
      let rate = 1 - this.marketInfo.market_rate / 100;
      rate = price1 / price2 * rate;
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
