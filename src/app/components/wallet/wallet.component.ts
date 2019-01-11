import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { NgModule } from '@angular/core';
import { UserInfo, AppConstants } from '../globaldata';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [MessageService]
})
export class WalletComponent implements OnInit {
  selectedCoin: string;
  buttonColor: string;
  selectedIcon: string;
  selectedAddress: string;
  qrCodeAddress: string;
  sendingAmountC =0.00;
  sendingAmountU = 0.00;
  walletBalance: any;
  _baseURL: string;

  @Input() sideMenuComponent: SideMenuComponent;

  constructor(
    private modalService: NgbModal,
    private userInfo: UserInfo,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private http : HttpClient
  ) {
   this.setCoin('BTC');
    this._baseURL = AppConstants.baseURL;
  }

  ngOnInit() {
    this.walletBalance = {
      'BTC' : 0,
      'ETH' : 0,
      'LTC' : 0,
      'MOBI' : 0,
    }
    this.getBalance();
  }

  setCoin(coin:string){
    this.selectedCoin = coin;
    if(coin=='BTC') {
      this.buttonColor = '#ea9914';
      this.selectedIcon = "./assets/BTC_Logo.png";
    }
    else if(coin=='ETH') {
      this.buttonColor = "#627eea";
      this.selectedIcon = "./assets/ETH_Logo.png";
    }
    else if(coin=='LTC') {
      this.buttonColor = "#989898";
      this.selectedIcon = "./assets/LTC_Logo.png";
    }
    else if(coin=='MOLK') {
      this.buttonColor = "#153281";
      this.selectedIcon = "./assets/MOLK_Logo.png";
    }
  }

  openModal(content){
    if(this.userInfo.bLogined) {
      this.http.get(this._baseURL + '/wallet/address?username=' + this.userInfo.username + '&coin=' + this.selectedCoin)
      .subscribe(
        data => {
          let res:any = data;
          if(res.status == "SUCCESS" && res.address != '')  {
            this.selectedAddress = res.address;
            this.qrCodeAddress = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+this.selectedAddress;
            this.modalService.open(content, { centered: true });
          }
          console.log(res);
      });
    } else {
      this.addSingle();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  addSingle() {
    this.messageService.add({ severity: 'info', summary: 'Login issue', detail: 'You have to login to use wallet.' });
  }

  addMultiple() {
    this.messageService.addAll(
      [
        { severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
        { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }
      ]
    );
  }

  clear() {
    this.messageService.clear();
  }

  copyAddress() {
    var icopy = document.createElement("input");
    document.body.appendChild(icopy);
    icopy.setAttribute('value', this.selectedAddress);
    icopy.select();
    document.execCommand("copy");
    document.body.removeChild(icopy);
  }

  getBalance() {
    if(this.userInfo.bLogined) {
      this.http.get(this._baseURL + '/wallet/balances?username=' + this.userInfo.username)
      .subscribe(
        data => {
          let res:any = data;
          if(res.status == "SUCCESS")  {
            this.walletBalance['BTC'] = res.btc_balance;
            this.walletBalance['ETH'] = res.eth_balance;
            this.walletBalance['LTC'] = res.ltc_balance;
            this.walletBalance['MOBI'] = res.mobi_balance;
          }
          console.log(res);
      });
    }
  }
}


