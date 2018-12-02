import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  bLogined : boolean = false;
  sLoginLabel: string = "Login";
  sUsername: string = "";

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private route : Router, 
    private modalService: NgbModal,
    private http : HttpClient,
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
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  setLoginFlag(username:string, flag: string) {
    this.sUsername = username;

    if(flag == 'SUCCESS') {
      this.closeModal();
      this.bLogined = true;
      this.sLoginLabel = "Logout";
    } else {
      this.bLogined = false;
      this.sLoginLabel = "Login";
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
    //var ret = this.http.get('http://localhost:8000/user/login?username=' + username + '&password=' + password);
    //console.log(ret);
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
    this.http.get('http://localhost:8000/user/logout?username=' + this.sUsername)
    .subscribe(
      data => {
        let res:any = data;
        this.setLoginFlag('', res.status);
        console.log(res);
    });
  }
}
