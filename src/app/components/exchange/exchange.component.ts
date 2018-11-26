import { Component, OnInit } from '@angular/core';

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
      balance : 0.4,
      rate : 6488.96,
      min : 0.013279,
      hover: false,
      hover1 : false,
    },
    {
      buttonColor : '#7d8fe8',
      selectedIcon : "./assets/ethereum.png",
      name : 'ETH',
      long : 'Ethereum',
      balance : 0.1,
      rate : 204.38,
      min : 0.16698473,
      hover : false,
      hover1 : false,
    },
    {
      buttonColor : '#989898',
      selectedIcon : "./assets/LTC_Logo.png",
      name : 'LTC',
      long : 'Litecoin',
      balance : 0,
      rate : 52.25,
      min : 0.64951131,
      hover : false,
      hover1 : false,
    },
    {
      buttonColor : '#ea7070',
      selectedIcon : "./assets/MOLK_Logo.png",
      name : 'MOLK',
      long : 'MobilinkToken',
      balance : 2000,
      rate : 0.013846,
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
  constructor() { }

  // cryptFormControl = new FormControl('',[Validators.required,Validators.email]);
  // useFormControl = new FormControl('',[Validators.required,Validators.email]);
  errorMessage : string = '';
  ngOnInit() {
    console.log('Exchange Page');
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
    this.receivingAmountC = this.eraseZeros((parseFloat(this.sendingAmountC)*this.coin_rates[this.coin_data[this.sendCoin].name+this.coin_data[this.receiveCoin].name]).toFixed(8));
    this.receivingAmountU = this.eraseZeros((parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].rate).toFixed(2));
    
  }
  updateReceiveC(){
    if(!this.receivingAmountU || !parseFloat(this.receivingAmountU)){
      this.receivingAmountC = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00';
      return;
    } 
    this.receivingAmountC = this.eraseZeros((parseFloat(this.receivingAmountU)/this.coin_data[this.receiveCoin].rate).toFixed(8));
    this.sendingAmountC = this.eraseZeros((parseFloat(this.receivingAmountC)/this.coin_rates[this.coin_data[this.sendCoin].name+this.coin_data[this.receiveCoin].name]).toFixed(8));
    this.sendingAmountU = this.eraseZeros((parseFloat(this.sendingAmountC)*this.coin_data[this.sendCoin].rate).toFixed(2));
    this.checkError();
    
    
  }
  updateReceiveU(){
    if(!this.receivingAmountC || !parseFloat(this.receivingAmountC)){
      this.receivingAmountU = '0.00'; 
      this.sendingAmountU = '0.00';
      this.sendingAmountC = '0.00'; 
      return;
    } 
    this.receivingAmountU = this.eraseZeros((parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].rate).toFixed(2));
    this.sendingAmountC = this.eraseZeros((parseFloat(this.receivingAmountC)/this.coin_rates[this.coin_data[this.sendCoin].name+this.coin_data[this.receiveCoin].name]).toFixed(8));
    this.sendingAmountU = this.eraseZeros((parseFloat(this.sendingAmountC)*this.coin_data[this.sendCoin].rate).toFixed(2));
    this.checkError();
    
  }
  updateSendC(){
    if(!this.sendingAmountU || !parseFloat(this.sendingAmountU)){
      this.sendingAmountC = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountC = this.eraseZeros((parseFloat(this.sendingAmountU)/this.coin_data[this.sendCoin].rate).toFixed(8));
    this.receivingAmountC = this.eraseZeros((parseFloat(this.sendingAmountC)*this.coin_rates[this.coin_data[this.sendCoin].name+this.coin_data[this.receiveCoin].name]).toFixed(8));
    this.receivingAmountU = this.eraseZeros((parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].rate).toFixed(2));
    this.checkError();
  }
  updateSendU(){
    if(!this.sendingAmountC || !parseFloat(this.sendingAmountC)){
      this.sendingAmountU = '0.00'; 
      this.receivingAmountC = '0.00'; 
      this.receivingAmountU = '0.00'; 
      return;
    } 
    this.sendingAmountU = this.eraseZeros((parseFloat(this.sendingAmountC)*this.coin_data[this.sendCoin].rate).toFixed(2));
    this.receivingAmountC = this.eraseZeros((parseFloat(this.sendingAmountC)*this.coin_rates[this.coin_data[this.sendCoin].name+this.coin_data[this.receiveCoin].name]).toFixed(8));
    this.receivingAmountU = this.eraseZeros((parseFloat(this.receivingAmountC)*this.coin_data[this.receiveCoin].rate).toFixed(2));
    this.checkError();
  }

  checkError(){
    if(parseFloat(this.sendingAmountC)>this.coin_data[this.sendCoin].balance) this.errorMessage = 'Not enough ' + this.coin_data[this.sendCoin].long + ' to start this transaction';
    else this.errorMessage = '';
  }

  setAllAmount(){
    this.sendingAmountC = this.eraseZeros(this.coin_data[this.sendCoin].balance.toFixed(8));
    this.updateSendU();
  }
  setHalfAmount(){
    this.sendingAmountC = this.eraseZeros((this.coin_data[this.sendCoin].balance/2).toFixed(8));
    this.updateSendU();
  }
  setMinAmount(){
    this.sendingAmountC = this.eraseZeros((this.coin_data[this.sendCoin].min).toFixed(8));
    this.updateSendU();
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

}
