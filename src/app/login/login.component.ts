import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../model/User.model';
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

  constructor(private rest: RestService) {

  }

  login(user: User) {
    this.rest.login(user.username, user.password).subscribe(event => {
      if (event.type == HttpEventType.Response && event.ok) {
        console.log(event.body)
      }
    })
  }

}
