import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  showAds: boolean = true;

  constructor(private authS: AuthService) {

  }

  loggout() {
    this.authS.logout()
  }
}
