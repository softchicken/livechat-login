import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../account/models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {
  }

  public login(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }

  public logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/account');
  }
}
