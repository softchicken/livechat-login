import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  constructor(public authenticationService: AuthenticationService) { }

}
