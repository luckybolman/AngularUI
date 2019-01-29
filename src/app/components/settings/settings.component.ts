import { Component, OnInit } from '@angular/core';
import { UserInfo, AppConstants } from '../globaldata';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  _baseURL: string;
  username: string = '';
  fullname: string = '';

  address: string = '';
  phonenumber: string = '';
  email: string = '';
  emailconfrimed: boolean = false;
  isAccountChanged: boolean = false;
  isPasswordChanged: boolean = false;

  oldpassword: string = '';
  newpassword: string = '';
  repeatpassword: string = '';

  constructor(
    private userInfo: UserInfo,
    private http : HttpClient
  ) {
    this._baseURL = AppConstants.baseURL;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    if(this.userInfo.bLogined) {
      this.http.get(this._baseURL + '/user/getaccount?username=' + this.userInfo.username + '&userid=' + this.userInfo.userid)
      .subscribe(
        data => {
          let res:any = data;
          if(res.status == "SUCCESS") {
            this.username = res.username;
            if(res.fullname) this.fullname = res.fullname;
            if(res.address) this.address = res.address;
            if(res.phonenumber) this.phonenumber = res.phonenumber;
            if(res.email) this.email = res.email;
          }
      });
    }
  }

  onChangeAccount() {
    this.isAccountChanged = true;
  }

  onChangePassword() {
    this.isPasswordChanged = true;
  }

  updateAccount() {
    if(this.userInfo.bLogined) {
      this.http.post(this._baseURL + "/user/update/account",
      {
        "username": this.userInfo.username,
        "userid": this.userInfo.userid,
        "fullname": this.fullname,
        "address": this.address,
        "phonenumber": this.phonenumber
      })
      .subscribe(
        data => {
          
        },
        error => {
            console.log("Error", error);
        }
      ); 
    }
  }

  updatePassword() {
    if(this.userInfo.bLogined) {
      this.http.post(this._baseURL + "/user/update/password",
      {
        "username": this.userInfo.username,
        "userid": this.userInfo.userid,
        "oldpassword": this.oldpassword,
        "newpassword": this.newpassword
      })
      .subscribe(
        data => {
          
        },
        error => {
            console.log("Error", error);
        }
      ); 
    }
  }
}
