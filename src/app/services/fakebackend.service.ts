import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../account/models/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class FakeBackendService implements HttpInterceptor {
  private emailRegExpPattern = new RegExp(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/);
  private passwordRegExpPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
  private fakeUsersDb: Array<User>;

  constructor() {
    this.fakeUsersDb = [{
        email: 'test@test.pl',
        password: 'Password1'
      }];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.endsWith('/api/users') && req.method === 'POST') {
          if (!req.body.email.match(this.emailRegExpPattern)) {
              return Observable.throw('Validation error: invalid email');
          }
          if (!req.body.password.match(this.passwordRegExpPattern)) {
              return Observable.throw('Validation error: invalid password');
          }
          const userMatch = this.fakeUsersDb.filter(user => {
            return user.email === req.body.email && user.password === req.body.password;
          });
          if (userMatch.length === 1) {
            const body = {
              email: req.body.email,
              rememberMe: req.body.rememberMe,
            };
            return Observable.of(new HttpResponse({ status: 200, body: body }));
          } else {
            return Observable.throw('Authentication error: incorrect email or password');
          }
      }
      return next.handle(req);
  }
}
