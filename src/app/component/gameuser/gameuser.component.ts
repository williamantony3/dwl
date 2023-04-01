import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { gameResponse } from 'src/app/model/gameResponse.model';
import { optionUser } from 'src/app/model/optionUser.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gameuser',
  templateUrl: './gameuser.component.html',
  styleUrls: ['./gameuser.component.css']
})
export class GameuserComponent {
  whatsapp: string = environment.whatsapp;
  gameId: string = '';
  game: gameResponse={
    away: {
      base64:'',
      dirPics:'',
      teamname:''
    },
    gameId: '',
    gameName: '',
    home: {
      base64:'',
      dirPics:'',
      teamname:''
    },
    locked: 0,
    segmentId: ''
  }
  optionUser: optionUser={
    gameId: '',
    userId: '',
    option: '',
    finalizedOption: 0
  }

  optionForm = new FormGroup({
    option: new FormControl()
  })

  constructor(private rest: RestService, private route: ActivatedRoute, private authS: AuthService, private matDialog: MatDialog) {
    route.params.subscribe((params) => {
      this.getGameById(params["gameId"]);
      this.gameId = params["gameId"];
      this.getGameDetailByUserAndGameId(authS.getUserId(), params["gameId"]);
      // console.log(this.optionUser.finalizedOption);
    });
  }

  getGameById(gameId: string) {
    this.rest.getGameById(gameId).subscribe(event => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.game = Object(event.body)['data'];
      }
    })
  }

  getGameDetailByUserAndGameId(userId: string, gameId: string) {
    this.rest.getGameDetailByUserAndGameId(userId, gameId).subscribe(event => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.optionUser = Object(event.body)['data'];
      }
    })
  }

  addGameDetail(){
    if(this.optionForm.get('option')?.value == null){
      this.matDialog.open(DialogComponent,
        {
          width: '33%',
          data: {
            question: "You haven't choose",
            yesStr: "Ok",
          },
        }
      );
    }else{
      const dialogP = this.matDialog.open(DialogComponent, {
        width: '33%',
        data: {
          question: 'Do you want to finalize?',
          yesStr: 'Yes',
          noStr: 'No',
        },
      });
      dialogP.afterClosed().subscribe((event) => {
        if (event && event.data) {
          this.rest.addGameDetail(this.gameId, this.optionForm.get('option')?.value, 1).subscribe((event) => {
            if (event.type == HttpEventType.Response && event.ok && event.body) {
                  const dialog = this.matDialog.open(DialogComponent,
                    {
                      width: '33%',
                      data: {
                        question: "Finalized succesfully",
                        yesStr: "Ok",
                      },
                    }
                  );
                  dialog.afterClosed().subscribe((event) => {
                    if (event && event.data) {
                      window.location.reload();
                    }
                  });
            }
          });
        }
      });
      
    }
  }
}
