import { Component } from '@angular/core';
import { CognitoAuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: CognitoAuthService) { }
}
