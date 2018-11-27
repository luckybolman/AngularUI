import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  @Input('name') pageName: string;
  constructor(private breakpointObserver: BreakpointObserver, private route : Router, private modalService: NgbModal) { }

  ngOnInit() {
    
  }


  gotoHelp(){
    require('electron').shell.openExternal("www.mobilink.io");
  }

  openModal(content){
    this.modalService.open(content, { centered: true });
  }

}
