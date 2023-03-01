import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User.model';
import { AuthService } from '../service/auth/auth.service';
import { RestService } from '../service/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {
    username: '',
    password: ''
  }

  constructor(private rest: RestService, private authS: AuthService, private router: Router) {

  }

  login(user: User) {
    this.rest.login(user.username, user.password).subscribe(event => {
      if (event.type == HttpEventType.Response && event.ok) {
        let token = Object(event.body)["data"];
        this.authS.setToken(token);
        this.router.navigate(["/home"])
      }
    })
  }

}
