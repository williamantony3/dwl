import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { segment } from 'src/app/model/segment.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  showAds: boolean = true;

  role: string = '';
  name: string = '';
  points: number = 0;
  listSegment: segment[] = [];

  constructor(private authS: AuthService, 
    private rest: RestService,) {
    // console.log(authS.getUsername());
    this.role = authS.getUserRole();
    this.name = authS.getUsername();
    this.getAllSegment();
    this.getUserPoints();
  }

  loggout() {
    this.authS.logout()
  }

  getAllSegment() {
    this.rest.getAllSegment().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listSegment = Object(event.body)['data'];
      }
    });
  }

  getUserPoints(){
    this.rest.getUserById(this.authS.getUserId()).subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.points = Object(event.body)['point'];
      }
    });

  }
}
