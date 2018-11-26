import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  isBackup : boolean = false;
  step= 1;
  isMatched:boolean = false;
  password:string = "";
  userPassword:string = "";
  stepTitle: string = "Create Your Password";
  stepDescription: string = "Mobillink protects your assets with a password.You must remember your password" 
                            +"as there is no way it can be recovered!Think of your password as a key to your"
                            +"Mobillink safe-it protects your money if someone else tries to access your computer";
  constructor() { }

  ngOnInit() {
  }

  gotoStep2() {
    this.step = 2;
    this.stepTitle = "Make Sure Your Password Is Memorized";
    this.stepDescription = "It's time to practice that password.Remember,if you forget your password"
                          +"there is no way to get it back!Make sure you've got your password memorized"
                          +"before you go on.";
    this.userPassword = this.password;
    this.password = "";
  }

  gotoStep1() {
    this.step = 1;
    this.stepTitle = "Create Your Password";
    this.stepDescription = "Mobillink protects your assets with a password.You must remember your password" 
                          +"as there is no way it can be recovered!Think of your password as a key to your"
                          +"Mobillink safe-it protects your money if someone else tries to access your computer";
  }

  gotoStep3() {
    this.step = 3;
    this.stepTitle = "Write Down Your Recovery Phrase";
    this.stepDescription = "This set of 12 words allows you to recover your wallet in case of loss or damage."
                          +"Write or print this and store it in safe or locked vault!Without it you will not"
                          +" be able to recover your money if something goes wrong."
  }

  gotoStep4() {
    this.step = 4;
    this.stepTitle = "Email Your Backup Link";
    this.stepDescription = "You're almost done!Type your email address to send a backup link for safe keeping."
                          +"You will need this if you lose access to your computer.";
  }

  checkPassword() {
    if(this.userPassword == this.password) this.isMatched = true;
    else this.isMatched = false;
  }

  finish() {
    this.isBackup = false;
    this.step = 1;
  }

  gotoStepPage() {
    this.isBackup = true;
  }

}
