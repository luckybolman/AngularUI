import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInfo, AppConstants, CoinInfo } from '../globaldata';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  
  errMessage: string = '';
  alertMessage: string = '';
  _baseURL: string;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private router : Router, 
    private modalService: NgbModal,
    private http : HttpClient,
    public userInfo: UserInfo,
    private coinInfo: CoinInfo
  ) { 
    this._baseURL = AppConstants.baseURL;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  @Input('name') pageName: string;

  ngOnInit() {
    
  }


  gotoHelp(){
    require('electron').shell.openExternal("www.mobilink.io");
  }

  openModal(content){
    if(this.userInfo.bLogined) {
      this.onLogout();
    } else {
      this.errMessage = "";
      this.alertMessage = "";
      this.modalService.open(content, { centered: true });
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  setLoginFlag(username:string, res: any) {
    if(res.status == 'SUCCESS') {
      this.closeModal();
      this.userInfo.bLogined = true;
      this.userInfo.username = username;
      this.userInfo.userid = res.userid;
      this.errMessage = '';
      this.alertMessage = '';
      this.router.navigate(['/wallet']);
    } else {
      this.userInfo.bLogined = false;
      this.userInfo.username = '';
      this.userInfo.userid = '';
      if(res.msg) this.errMessage = res.msg; else this.errMessage = '';
      this.coinInfo.initBalance();
      this.router.navigate(['/']);
    }
  }

  onLogin(username, password) {
    this.errMessage = "";
    this.alertMessage = "";

    if(username.length == 0) {
      this.errMessage = "Please input Username";
      return; 
    }

    if(password.length == 0) {
      this.errMessage = "Please input Password";
      return; 
    }

    var pwd = password.replace("#", "%23");

    this.http.get(this._baseURL + '/user/login?username=' + username + '&password=' + pwd)
    .subscribe(
      data => {
        this.setLoginFlag(username, data);
      },
      error => {
        this.errMessage = "Please check your network or Contact to support team";
      }
    );
  }

  onRegister(username, email, password, confirm) {
    this.errMessage = "";

    if(email.length == 0) {
      this.errMessage = "Please input Email Address";
      return; 
    }

    var reg = /\S+@\S+\.\S+/;
    if(!reg.test(email)) {
      this.errMessage = "Invalid Email Address";
      return; 
    }

    if(username.length == 0) {
      this.errMessage = "Please input Username";
      return; 
    }

    if(password.length == 0) {
      this.errMessage = "Please input Password";
      return; 
    }

    if(confirm.length == 0) {
      this.errMessage = "Please input Confirm Password";
      return; 
    }

    if(password != confirm) {
      this.errMessage = "Passwords does not match";
      return; 
    }

    this.http.post(this._baseURL + "/user/register",
      {
        "username": username,
        "email": email,
        "password": password
      })
      .subscribe(
        data => {
          this.setLoginFlag(username, data);
        },
        error => {
          this.errMessage = "Please check your network or Contact to support team";
        }
      );           
  }

  changePassword(vcode, newpass, repeatpass) {
    this.errMessage = "";

    if(vcode.length == 0) {
      this.errMessage = "Please check Verification code from email";
      return; 
    }

    if(newpass.length == 0) {
      this.errMessage = "Please input Password";
      return; 
    }

    if(repeatpass.length == 0) {
      this.errMessage = "Please input Confirm Password";
      return; 
    }

    if(newpass != repeatpass) {
      this.errMessage = "Passwords does not match";
      return; 
    }

    this.http.post(this._baseURL + "/user/changepass",
      {
        "vcode": vcode,
        "newpass": newpass,
        "userid": this.userInfo.userid
      })
      .subscribe(
        data => {
          var res:any = data; 
          if(res.status == "SUCCESS") {
            this.alertMessage = "Successfully changed";
          } else {
            this.errMessage = res.msg;
          }
        },
        error => {
          this.errMessage = "Please check your network or Contact to support team";
        }
      );           
  }

  resetPassword(email) {
    this.errMessage = "";
    if(email.length == 0) {
      this.errMessage = "Please input Email Address";
      return; 
    }

    var reg = /\S+@\S+\.\S+/;
    if(!reg.test(email)) {
      this.errMessage = "Invalid Email Address";
      return; 
    }

    this.http.get(this._baseURL + '/user/resetpass?user='  + email)
    .subscribe(
      data => {
        var res:any = data; 
        if(res.status == "SUCCESS") {
          this.userInfo.userid = res.uid;
          this.alertMessage = "Please check email to get verification code";
        } else {
          this.errMessage = res.msg;
        }
      },
      error => {
        this.errMessage = "Please check your network or Contact to support team";
      }
    );
  }

  onLogout() {
    this.http.get(this._baseURL + '/user/logout?username=' + this.userInfo.username).subscribe();
    this.setLoginFlag('', '');

  }
}
