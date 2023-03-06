import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  constructor(private rest: RestService, private authS: AuthService, private router: Router) {
    this.getGameBySegmentId("eeda12a0-89f7-4346-bca5-9259ca5f664f");
  }

  

  getGameBySegmentId(segmentId: string) {
    this.rest.getListGameBySegmentId(segmentId).subscribe(event => {
      if (event.type == HttpEventType.Response && event.ok) {
        console.log(event.body);
      }
    })
  }
}
