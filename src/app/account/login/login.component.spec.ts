import { AuthenticationService } from './../../services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid if empty', () => {
    const email = component.userLoginForm.controls['email'];
    email.setValue('');
    const password = component.userLoginForm.controls['password'];
    password.setValue('');
    const rememberMe = component.userLoginForm.controls['rememberMe'];
    rememberMe.setValue(false);
    expect(component.userLoginForm.valid).toBeFalsy();
  });

  it('email input invalid if do not matching email RegExp', () => {
    const email = component.userLoginForm.controls['email'];
    email.setValue('test');
    const password = component.userLoginForm.controls['password'];
    password.setValue('Password1');
    const rememberMe = component.userLoginForm.controls['rememberMe'];
    rememberMe.setValue(false);
    expect(component.userLoginForm.valid).toBeFalsy();
  });

  it('password input invalid if do not matching password RegExp', () => {
    const email = component.userLoginForm.controls['email'];
    email.setValue('test@test.pl');
    const password = component.userLoginForm.controls['password'];
    password.setValue('password');
    const rememberMe = component.userLoginForm.controls['rememberMe'];
    rememberMe.setValue(false);
    expect(component.userLoginForm.valid).toBeFalsy();
  });

  it('form valid if inputs matching criteria', () => {
    const email = component.userLoginForm.controls['email'];
    email.setValue('live@chat.pany');
    const password = component.userLoginForm.controls['password'];
    password.setValue('LiveChatPany100');
    const rememberMe = component.userLoginForm.controls['rememberMe'];
    rememberMe.setValue(false);
    expect(component.userLoginForm.valid).toBeTruthy();
  });

  it('login button disabled when form invalid', () => {
    const email = component.userLoginForm.controls['email'];
    email.setValue('');
    const password = component.userLoginForm.controls['password'];
    password.setValue('');
    const rememberMe = component.userLoginForm.controls['rememberMe'];
    rememberMe.setValue(false);
    const submitButton = fixture.debugElement.query(By.css('input[type=submit]'));
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
});
