import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { NgModule } from '@angular/core';
import { UserInfo, AppConstants, CoinInfo } from '../globaldata';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [MessageService]
})
export class WalletComponent implements OnInit {
  selectedAddress: string;
  qrCodeAddress: string;
  sendingAmountC = '0.00';
  sendingAmountU = '0.00';
  selectedCoin: any;
  coin_data : any;
  _baseURL: string;

  @Input() sideMenuComponent: SideMenuComponent;

  constructor(
    private modalService: NgbModal,
    private userInfo: UserInfo,
    private coinInfo: CoinInfo,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private http : HttpClient
  ) {
    this._baseURL = AppConstants.baseURL;
  }

  ngOnInit() {
    this.coin_data = this.coinInfo.getCheckedCoins();
    if(this.coin_data.length > 0)
      this.setCoin(this.coin_data[0]);
    this.getBalance();
  }

  setCoin(coin:any){
    this.selectedCoin = coin;
  }

  openModal(content, page){
    //this.modalService.open(content, { centered: true });
    if(this.userInfo.bLogined) {
      if(page == 'send') {
        this.modalService.open(content, { centered: true });
      } else {
        this.http.get(this._baseURL + '/wallet/address?username=' + this.userInfo.username + '&coin=' + this.selectedCoin.symbol)
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
      }
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
            //res.balance
          }
          console.log(res);
      });
    }
  }

  onChangeC() {
    let amountC = parseFloat(this.sendingAmountC)
    if(amountC > 0) {
      this.sendingAmountU = (amountC * this.selectedCoin.price).toFixed(2);
    }
  }

  onChangeU() {
    let amountU = parseFloat(this.sendingAmountU)
    if(amountU > 0) {
      this.sendingAmountC = (amountU / this.selectedCoin.price).toFixed(8);
    }
  }
}


