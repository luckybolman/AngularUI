import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  coinTitle: string = "";
  coinData: any = [{'item_clicked':true,'coin_name':'Bitcoin','coin_unit':'BTC','coin_description':'Bitcoin uses peer-to-peer technology to operate with no central authority or banks. Managing transactions,and the issuing of bitcoins,is carried out collectively by the network.','color':'#ea9914','icon':'./assets/btc_logo.png'},
                  {'item_clicked':false,'coin_name':'Bitcoin Cash','coin_unit':'BCH','coin_description':'Bitcoin Cash is a hard-forked version of Bitcoin. It is similar to the Bitcoin protocol,however differences are defined in blocksize limits and difficulty adjustments.','color':'#8dc351','icon':'./assets/bitcoin_cash_logo.png'},
                  {'item_clicked':false,'coin_name':'Dash','coin_unit':'DASH','coin_description':'DASH aims to be privacy-centric with unlinkable transactions using the PrivateSend System.Blockchain governance is carried out via MasterNode system.','color':'#1c75bc','icon':'./assets/dashcoin_logo.png'},
                  {'item_clicked':true,'coin_name':'Ethereum','coin_unit':'ETH','coin_description':'Ethereum is a decentralized platform that runs smart contracts:applications that run exactly as programmed without any possibility of downtown,censorship,fraud or third party interference.','color':'#627eea','icon':'./assets/ethereum.png'},
                  {'item_clicked':false,'coin_name':'Litecoin','coin_unit':'LTC','coin_description':'Litecoin provides fast,2.5 minute transaction confirmations and uses scrypt-based proof-of-work to target everyday computers.Litecoin is often considered the silver to Bitcoin gold.','color':'#989898','icon':'./assets/ltc_logo.png'},
                  {'item_clicked':false,'coin_name':'MobilinkToken','coin_unit':'MOLK','coin_description':'','color':'#153281','icon':'./assets/molk_logo.png'}]
  showCoinData: any = [];
  constructor() {
    this.showCoinData = this.coinData;
   }

  ngOnInit() {
  }

  additionChanged(index: number) {
    console.log(index);
    this.coinData[index].item_clicked = !this.coinData[index].item_clicked;
  }

  searchCoin() {
    console.log("clicked");
    console.log(this.coinTitle);
    this.showCoinData = [];
    if(this.coinTitle=="") this.showCoinData = this.coinData;
    else {
      for(let coinItem of this.coinData){
        if(coinItem.coin_name.search(this.coinTitle)!=-1) this.showCoinData.push(coinItem);
      }
    }
    
  }

}
