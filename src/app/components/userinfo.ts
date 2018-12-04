import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo {
  bLogined: boolean = false;
  username: string = '';
}