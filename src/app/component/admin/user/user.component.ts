import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { claim } from 'src/app/model/claim.model';
import { history } from 'src/app/model/history.model';
import { optionAdmin } from 'src/app/model/optionAdmin.model';
import { teamResponse } from 'src/app/model/teamResponse.model';
import { User } from 'src/app/model/User.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  listUser: User[] = [];
  listHistory: history[] = [];
  listUncompletedHistoryByUser: history[] = [];
  listGameTeam: teamResponse[] = [];
  showHistoryField: boolean = false;
  showChangeOptionField: boolean = false;
  showGameTeamField: boolean = false;

  constructor(
    private rest: RestService,
    private matDialog: MatDialog,
    private authS:AuthService
    
  ) {
    // this.formGroup.get('teamName')?.valueChanges.subscribe
    // (event => {console.log(event)});
    this.getAllUser();
    
  }

  formGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  deleteFormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
  });

  redeemFormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
  });

  redeemHistoryFormGroup = new FormGroup({
    history: new FormControl('', Validators.required),
  });

  changeOptionFormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
  });

  changeOptionHistoryFormGroup = new FormGroup({
    history: new FormControl('', Validators.required),
  });

  gameTeamFormGroup = new FormGroup({
    option: new FormControl('', Validators.required),
  });

  user: User = {
    username: '',
    password: '',
    role: '',
  };

  claim: claim = {
    userId: '',
    gameId: ''
  }

  optionAdmin: optionAdmin = {
    userId: '',
    gameId: '',
    option: ''
  }

  addUser() {
    this.formGroup.markAllAsTouched();
    this.user.username = this.formGroup.get('userName')?.value!;
    this.user.password = this.formGroup.get('password')?.value!;
    this.user.role = this.formGroup.get('role')?.value!;
    // console.log(this.team)
    if (this.formGroup.valid) {
      this.rest.addUser(this.user).subscribe((event) => {
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
                  this.getAllUser();
                }
              });
        }
      });
    }
  }

  getAllUser() {
    this.rest.getAllUser().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:User[] = Object(event.body)['data'] ;
        this.listUser = data.filter(f => f.id != this.authS.getUserId())
      }
    });
  }

  getAllGameTeam() {
    this.rest.getGameByGameId(this.changeOptionHistoryFormGroup.get('history')?.value!).subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listGameTeam = [];
        this.listGameTeam.push(Object(event.body)['data']['home']);
        this.listGameTeam.push(Object(event.body)['data']['away']);
      }
    });
  }

  getHistoryGameUser() {
    this.rest.getHistoryGameUser(this.redeemFormGroup.get('userName')?.value!).subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:history[] = Object(event.body)['data'] ;
        this.listHistory = data.filter(f => f.result != false && f.user_claim == null);
      }
    });
  }

  getUncompletedHistoryGameUser() {
    this.rest.getHistoryGameUser(this.changeOptionFormGroup.get('userName')?.value!).subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        let data:history[] = Object(event.body)['data'] ;
        this.listUncompletedHistoryByUser = data.filter(f => f.result == null);
      }
    });
  }

  deleteUser() {
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
            .deleteUserById(this.deleteFormGroup.get('userName')?.value!)
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

  showHistoryForm(){
    this.redeemFormGroup.markAllAsTouched();
    if (this.redeemFormGroup.valid) {
      this.showHistoryField = true;
      this.getHistoryGameUser();
    }
  }

  showUncompletedHistoryForm(){
    this.changeOptionFormGroup.markAllAsTouched();
    if (this.changeOptionFormGroup.valid) {
      this.showChangeOptionField = true;
      this.getUncompletedHistoryGameUser();
    }
  }

  showGameTeamForm(){
    this.changeOptionHistoryFormGroup.markAllAsTouched();
    if (this.changeOptionHistoryFormGroup.valid) {
      this.showGameTeamField = true;
      this.getAllGameTeam();
    }

  }

  userClaimPointGame() {
    this.redeemHistoryFormGroup.markAllAsTouched();
    this.claim.userId = this.redeemFormGroup.get('userName')?.value!;
    this.claim.gameId = this.redeemHistoryFormGroup.get('history')?.value!;
    // console.log(this.team)
    if (this.redeemHistoryFormGroup.valid) {
      this.rest.userClaimPointGame(this.claim).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Redeemed succesfully",
                    yesStr: "Ok",
                  },
                }
              );
              dialog.afterClosed().subscribe((event) => {
                if (event && event.data) {
                  window.location.reload();
                  this.getAllUser();
                }
              });
        }
      });
    }
  }

  changeUserOption(){
    this.gameTeamFormGroup.markAllAsTouched();
    this.optionAdmin.userId = this.changeOptionFormGroup.get('userName')?.value!;
    this.optionAdmin.gameId = this.changeOptionHistoryFormGroup.get('history')?.value!;
    this.optionAdmin.option = this.gameTeamFormGroup.get('option')?.value!;
    // console.log(this.team)
    if (this.gameTeamFormGroup.valid) {
      this.rest.changeUserOption(this.optionAdmin).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Changed succesfully",
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
}
