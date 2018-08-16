// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LoginComponent } from './login/login.component';
// import { AccountComponent } from './account.component';
// import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
// import { Location } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { routes } from './account-routing.module';

// describe('AccountRouting', () => {
//   let location: Location;
//   let router: Router;
//   let fixture;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//         RouterTestingModule.withRoutes(routes)
//       ],
//       declarations: [
//         AccountComponent,
//         LoginComponent
//       ],
//     }).compileComponents();
//   }));
//   beforeEach(() => {
//     router = TestBed.get(Router);
//     location = TestBed.get(Location);
//     fixture = TestBed.createComponent(AccountComponent);
//     router.initialNavigation();
//   });

//   it('navigate to "**" redirects to "" ', fakeAsync(() => {
//     router.navigate(['/account']);
//     tick();
//     expect(location.path()).toBe('/account/login');
//   }));

// });
