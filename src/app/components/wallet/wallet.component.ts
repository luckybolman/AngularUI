import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  selectedCoin: string;
  buttonColor: string;
  selectedIcon: string;
  selectedAddress: string;
  qrCodeAddress: string;
  sendingAmountC =0.00;
  sendingAmountU = 0.00;
  constructor(private modalService: NgbModal) {
    this.setCoin('BTC');
   }

  ngOnInit() {
  }

  setCoin(coin:string){
    this.selectedCoin = coin;
    if(coin=='BTC') {
      this.buttonColor = '#ea9914';
      this.selectedIcon = "./assets/BTC_Logo.png";
      this.selectedAddress = "14fwCjcRCNURzdQ38xfaHYgbFoQg6r6rA3";
      
    }
    else if(coin=='ETH') {
      this.buttonColor = "#627eea";
      this.selectedIcon = "./assets/ethereum.png";
      this.selectedAddress = "0x58D578B212dbD983e649d506F3436ecb07a09dF6";
    }
    else if(coin=='LTC') {
      this.buttonColor = "#989898";
      this.selectedIcon = "./assets/LTC_Logo.png";
      this.selectedAddress = "LeGVDmXa8Bd7sQatSKe5ED6NvLZuGSJqq6";
    }
    else if(coin=='MOLK') {
      this.buttonColor = "#153281";
      this.selectedIcon = "./assets/MOLK_Logo.png";
      this.selectedAddress = "0x58D578B212dbD983e649d506F3436ecb07a09dF6";
    }
    this.qrCodeAddress = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+this.selectedAddress;
  }

  openModal(content){
    this.modalService.open(content, { centered: true });
  }

}
