import { Router } from '@angular/router';
import { User } from './../models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  login$: Subscription;
  emailRegExpPattern = new RegExp(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/);
  passwordRegExpPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
  errorMessages = [];
  userLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this.prepareReactiveForm();
  }

  ngOnDestroy() {
    this.login$.unsubscribe();
  }

  private login(model) {
    this.clearErrorMessages();
    const user = new User();
    user.email = model.email;
    user.password = model.password;
    user.rememberMe = model.rememberMe;
    this.login$ = this.authenticationService.login(user)
      .subscribe(
        userLoggedIn => {
          if (userLoggedIn.rememberMe) {
            localStorage.setItem('loginInfo', JSON.stringify(userLoggedIn));
          } else {
            sessionStorage.setItem('loginInfo', JSON.stringify(userLoggedIn));
          }
          this.router.navigateByUrl('');
        },
        error => this.errorMessages.push(error)
      );
  }

  private prepareReactiveForm() {
    this.userLoginForm = this.formBuilder.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegExpPattern)
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.passwordRegExpPattern)
      ])],
      'rememberMe': false
    });
  }

  private clearErrorMessages() {
    this.errorMessages = [];
  }
}
