import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('loginInfo') || sessionStorage.getItem('loginInfo')) {
      return true;
    } else {
      this.router.navigateByUrl('/account');
      return false;
    }
  }
}
