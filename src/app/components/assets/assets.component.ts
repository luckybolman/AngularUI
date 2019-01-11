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
    this.showCoinData[index].checked = !this.showCoinData[index].checked;
    this.coinInfo.data[index].checked = this.showCoinData[index].checked;
  }

  searchCoin() {
    console.log(this.coinTitle);
    this.showCoinData = [];
    if(this.coinTitle=="") this.showCoinData = this.coinInfo;
    else {
      /*for(let coinItem of this.coinData){
        if(coinItem.coin_name.search(this.coinTitle)!=-1) this.showCoinData.push(coinItem);
      }*/
    }
  }
}
