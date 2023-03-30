import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { gameResponse } from 'src/app/model/gameResponse.model';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-segmentuser',
  templateUrl: './segmentuser.component.html',
  styleUrls: ['./segmentuser.component.css']
})
export class SegmentuserComponent {
  

  listGame: gameResponse[] = [];

  constructor(private rest: RestService, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.getGameBySegmentId(params["segmentId"]);
    });
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
      }
    })
  }

}
