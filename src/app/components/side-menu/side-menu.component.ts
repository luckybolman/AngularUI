import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../userinfo';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  
  constructor(
    private breakpointObserver: BreakpointObserver, 
    private route : Router, 
    private modalService: NgbModal,
    private http : HttpClient,
    public userInfo: UserInfo
  ) { }

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

  setLoginFlag(username:string, flag: string) {
    if(flag == 'SUCCESS') {
      this.closeModal();
      this.userInfo.bLogined = true;
      this.userInfo.username = username;
    } else {
      this.userInfo.bLogined = false;
      this.userInfo.username = '';
    }
  }

  onLogin(username, password) {
    if(username.length == 0 || password.length == 0)
      return "Please input Username and Password";

    this.http.get('http://localhost:8000/user/login?username=' + username + '&password=' + password)
    .subscribe(
      data => {
        let res:any = data;
        this.setLoginFlag(username, res.status);
        console.log(res);
    });
  }

  onRegister(username, email, password) {
    if(username.length == 0 || email.length == 0 || password.length == 0)
      return "Please input Username and Password";

    this.http.post("http://localhost:8000/user/register",
      {
        "username": username,
        "email": email,
        "password": password
      })
      .subscribe(
        data => {
          let res:any = data;
          this.setLoginFlag(username, res.status);
          console.log(res);
        },
        error => {
            console.log("Error", error);
        }
      );           
  }

  onLogout() {
    this.http.get('http://localhost:8000/user/logout?username=' + this.userInfo.username).subscribe();
    this.setLoginFlag('', '');
  }
}
