import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { game } from 'src/app/model/game.model';
import { gameResponse } from 'src/app/model/gameResponse.model';
import { gameToSegment } from 'src/app/model/gameToSegment.model';
import { gameWinner } from 'src/app/model/gameWinner.model';
import { segment } from 'src/app/model/segment.model';
import { teamResponse } from 'src/app/model/teamResponse.model';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  listHome: teamResponse[] = [];
  listAway: teamResponse[] = [];
  listGame: gameResponse[] = [];
  listGameUnsegment: gameResponse[] = [];
  listSegment: segment[] = [];
  listGameTeam: teamResponse[] = [];
  showEditForm: boolean = false;
  listUncompletedGame: gameResponse[] = [];
  

  game: game = {
    gameName: '',
    home: '',
    away: '',
    locked: 0,
  };

  gameToSegment: gameToSegment={
    segmentId: '',
    gameId: ''
  }

  gameWinner: gameWinner={
    gameId: '',
    winner: ''
  }

  constructor(
    private rest: RestService,
    private matDialog: MatDialog
  ) {
    // this.formGroup.get('teamName')?.valueChanges.subscribe
    // (event => {console.log(event)});
    this.getAllHome();
    this.getAllAway();
    this.getAllGame();
    this.getAllGameUnsegment();
    this.getAllSegment();
    this.getAllUncompletedGame();
  }

  formGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
    home: new FormControl('', Validators.required),
    away: new FormControl('', Validators.required),
    locked: new FormControl('', Validators.required)
  });

  deleteFormGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
  });

  lockFormGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
    locked: new FormControl('', Validators.required),
  });

  addToSegmentFormGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
    segment: new FormControl('', Validators.required),
  });

  updateGameWinnerFormGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
    winner: new FormControl('', Validators.required),
  });

  addGame() {
    this.formGroup.markAllAsTouched();
    this.game.gameName = this.formGroup.get('gameName')?.value!;
    this.game.away = this.formGroup.get('away')?.value!;
    this.game.home = this.formGroup.get('home')?.value!;
    this.game.locked = +this.formGroup.get('locked')?.value!;
    // console.log(this.team)
    if (this.formGroup.valid) {
      this.rest.addGame(this.game).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Added succesfully",
                    yesStr: "Ok",
                  },
                }
              );
              dialog.afterClosed().subscribe((event) => {
                if (event && event.data) {
                  window.location.reload();
                  this.getAllHome();
                  this.getAllAway();
                  this.getAllGame();
                }
              });
        }
      });
    }
  }

  addGameIntoSegment() {
    this.addToSegmentFormGroup.markAllAsTouched();
    this.gameToSegment.gameId = this.addToSegmentFormGroup.get('gameName')?.value!;
    this.gameToSegment.segmentId = this.addToSegmentFormGroup.get('segment')?.value!;
    // console.log(this.team)
    if (this.addToSegmentFormGroup.valid) {
      this.rest.addGameIntoSegment(this.gameToSegment).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Added succesfully",
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
  }

  updateGameWinner() {
    this.updateGameWinnerFormGroup.markAllAsTouched();
    this.gameWinner.gameId = this.updateGameWinnerFormGroup.get('gameName')?.value!;
    this.gameWinner.winner = this.updateGameWinnerFormGroup.get('winner')?.value!;
    // console.log(this.team)
    if (this.updateGameWinnerFormGroup.valid) {
      this.rest.updateGameWinner(this.gameWinner).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Added result succesfully",
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
  }

  setLockedStatusGame() {
    this.lockFormGroup.markAllAsTouched();
    // console.log(this.team)
    if (this.lockFormGroup.valid) {
      this.rest.setLockedStatusGame(this.lockFormGroup.get('gameName')?.value!, +this.lockFormGroup.get('locked')?.value!).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Set lock status succesfully",
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
  }

  getAllSegment() {
    this.rest.getAllSegment().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listSegment = Object(event.body)['data'];
      }
    });
  }

  getAllGame() {
    this.rest.getAllGame().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listGame = Object(event.body)['data'];
      }
    });
  }

  getAllUncompletedGame() {
    this.rest.getAllGame().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:gameResponse[] = Object(event.body)['data'];
        this.listUncompletedGame = data.filter(f => f.winner == null)
      }
    });
  }
  

  getAllGameUnsegment() {
    this.rest.getAllGame().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:gameResponse[] = Object(event.body)['data'];
        this.listGameUnsegment = data.filter(f => f.segmentId == null);
      }
    });
  }

  getAllGameTeam() {
    this.rest.getGameByGameId(this.updateGameWinnerFormGroup.get('gameName')?.value!).subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listGameTeam = [];
        this.listGameTeam.push(Object(event.body)['data']['home']);
        this.listGameTeam.push(Object(event.body)['data']['away']);
      }
    });
  }

  getAllHome() {
    this.rest.getAllTeam().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:teamResponse[] = Object(event.body)['data'];
        this.listHome = data.filter(f => f.teamId != 'da41073c-0f44-4174-9d03-3d3f157c34f0' && f.teamId != this.formGroup.get('away')?.value);
      }
    });
  }

  getAllAway() {
    this.rest.getAllTeam().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:teamResponse[] = Object(event.body)['data'];
        this.listAway = data.filter(f => f.teamId != 'da41073c-0f44-4174-9d03-3d3f157c34f0' && f.teamId != this.formGroup.get('home')?.value);
      }
    });
  }

  deleteGame() {
    this.deleteFormGroup.markAllAsTouched();
    if (this.deleteFormGroup.valid) {
      const dialog = this.matDialog.open(DialogComponent, {
        width: '33%',
        data: {
          question: 'Do you want to delete?',
          yesStr: 'Yes',
          noStr: 'No',
        },
      });
      dialog.afterClosed().subscribe((event) => {
        if (event && event.data) {
          this.rest
            .deleteGameById(this.deleteFormGroup.get('gameName')?.value!)
            .subscribe((event) => {
              if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog2 = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Deleted succesfully",
                    yesStr: "Ok",
                  },
                }
              );
              dialog2.afterClosed().subscribe((event) => {
                if(event && event.data){
                  window.location.reload();
                }
              })
              }
            });
        }
      });
    }
  }
}
