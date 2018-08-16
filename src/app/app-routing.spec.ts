import { AccountModule } from './account/account.module';
import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MainComponent } from './main/main.component';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModuleFactoryLoader } from '@angular/core';

describe('AppRouting', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        MainComponent
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "**" redirects to "" ', fakeAsync(() => {
    router.navigate(['livechat']);
    tick();
    expect(location.path()).toBe('');
  }));

  // it('navigate to "account" redirects to "/account/login" ', () => {
  //   const loader = TestBed.get(NgModuleFactoryLoader);
  //   loader.stubbedModules = { lazyModule: AccountModule };
  //   router.resetConfig([
  //     { path: 'account', loadChildren: 'lazyModule' }
  //   ]);
  //   router.navigate(['account']).then(() => {
  //     expect(location.path()).toBe('account/login');
  //   });
  // });
});
