import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dwl';

  constructor(private authS: AuthService) { }

  isloggin() {
    return this.authS.isloggin();
  }
}
