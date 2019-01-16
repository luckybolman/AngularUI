import { Component, OnInit } from '@angular/core';
import { CoinInfo } from '../globaldata';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  coinTitle: string = "";
  showCoinData: any = [];

  constructor(
    public coinInfo: CoinInfo
  ) {
    this.showCoinData = this.coinInfo.data;
   }

  ngOnInit() {
  }

  additionChanged(index: number) {
    var symbol = this.showCoinData[index].symbol;
    if(symbol != 'BTC' && symbol != 'ETH') {
      this.showCoinData[index].checked = !this.showCoinData[index].checked;
      //var dataIndex: number = this.coinInfo.dataIndex[symbol];
      //this.coinInfo.data[dataIndex].checked = this.showCoinData[index].checked;
    }
  }

  searchCoin() {
    if(this.coinTitle=="") 
      this.showCoinData = this.coinInfo.data;
    else {
      this.showCoinData = [];
      var sub = this.coinTitle.toLowerCase();
      for(let coinItem of this.coinInfo.data){
        if(coinItem.name.toLowerCase().search(sub) != -1 || coinItem.symbol.toLowerCase().search(sub) != -1) 
          this.showCoinData.push(coinItem);
      }
    }
  }
}
