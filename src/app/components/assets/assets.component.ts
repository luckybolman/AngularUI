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
