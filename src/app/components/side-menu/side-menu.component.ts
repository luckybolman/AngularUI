import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInfo, AppConstants } from '../globaldata';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  
  errMessage: string = '';
  _baseURL: string;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private router : Router, 
    private modalService: NgbModal,
    private http : HttpClient,
    public userInfo: UserInfo
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
      this.errMessage = '';
    } else {
      this.userInfo.bLogined = false;
      this.userInfo.username = '';
      if(res.msg) 
        this.errMessage = res.msg; 
      else 
        this.errMessage = '';
    }
  }

  onLogin(username, password) {
    if(username.length == 0 || password.length == 0)
      return "Please input Username and Password";

    this.http.get(this._baseURL + '/user/login?username=' + username + '&password=' + password)
    .subscribe(
      data => {
        this.setLoginFlag(username, data);
        this.router.navigate(['/wallet'])
    });
  }

  onRegister(username, email, password) {
    if(username.length == 0 || email.length == 0 || password.length == 0)
      return "Please input Username and Password";

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
            console.log("Error", error);
        }
      );           
  }

  onLogout() {
    this.http.get(this._baseURL + '/user/logout?username=' + this.userInfo.username).subscribe();
    this.setLoginFlag('', '');
  }
}
