import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { NgModule } from '@angular/core';
import { UserInfo } from '../userinfo';
import { MessageService } from 'primeng/api';

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

  @Input() sideMenuComponent: SideMenuComponent;

  constructor(
    private modalService: NgbModal,
    private userInfo: UserInfo,
    private snackBar: MatSnackBar,
    private messageService: MessageService
  ) {
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
    if(this.userInfo.bLogined) {
      this.modalService.open(content, { centered: true });
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
}


