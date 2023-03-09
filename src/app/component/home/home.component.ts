import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { Game } from 'src/app/model/game.model';
import { team } from 'src/app/model/team.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  listGame: Game[] = [];

  constructor(private rest: RestService, private authS: AuthService, private router: Router) {
    this.getGameBySegmentId("eeda12a0-89f7-4346-bca5-9259ca5f664f");
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    items: 3,
  }
  

  getGameBySegmentId(segmentId: string) {
    this.rest.getListGameBySegmentId(segmentId).subscribe(event => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listGame = Object(event.body)['data'];
        // console.log(this.listGame);
        // this.listGame.forEach(element => {
        //   console.log(element.away.teamname + " | " + element.home.teamname)
        // })
      }
    })
  }
}
