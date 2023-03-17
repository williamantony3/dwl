import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { team } from 'src/app/model/team.model';
import { teamResponse } from 'src/app/model/teamResponse.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  listTeam: teamResponse[] = [];
  showEditForm: boolean = false;

  constructor(
    private rest: RestService,
    private router: Router,
    private authS: AuthService,
    private matDialog: MatDialog
  ) {
    // this.formGroup.get('teamName')?.valueChanges.subscribe
    // (event => {console.log(event)});
    this.getAllTeam();
  }

  formGroup = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  deleteFormGroup = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  editFormGroup = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  editSaveFormGroup = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  team: team = {
    teamPics: '',
    dirPics: '',
    teamname: '',
  };

  addTeam() {
    this.formGroup.markAllAsTouched();
    this.team.teamname = this.formGroup.get('teamName')?.value!;
    // console.log(this.team)
    if (this.formGroup.valid && this.team.teamPics.length > 0) {
      this.rest.addTeam(this.team).subscribe((event) => {
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
                  this.getAllTeam();
                }
              });
        }
      });
    }
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = (e) => {
      let arrayBuffer = fileReader.result?.toString();
      // console.log(arrayBuffer?.split(",")[1], event.target.files[0].name)
      this.team.teamPics = arrayBuffer?.split(',')[1]!;
      this.team.dirPics = event.target.files[0].name;
    };
    fileReader.onerror = (e) => {
      console.log(e);
    };
    fileReader.readAsDataURL(file);
  }

  getAllTeam() {
    this.rest.getAllTeam().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listTeam = Object(event.body)['data'];
      }
    });
  }

  deleteTeam() {
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
            .deleteTeamById(this.deleteFormGroup.get('teamName')?.value!)
            .subscribe((event) => {
              if (event.type == HttpEventType.Response && event.ok && event.body) {
              this.getAllTeam();
              this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Deleted succesfully",
                    yesStr: "Ok",
                  },
                }
              );
              }
            });
        }
      });
    }
  }

  editTeam(){
    this.editFormGroup.markAllAsTouched();
    if (this.editFormGroup.valid) {
      this.showEditForm = true;
    }
  }

  cancelEditTeam(){
    this.showEditForm = false;
  }

  editSaveTeam(){
    this.editSaveFormGroup.markAllAsTouched();
    this.team.teamname = this.editSaveFormGroup.get('teamName')?.value!;
    this.team.teamId = this.editFormGroup.get('teamName')?.value!;
    // console.log(this.team)
    if (this.editSaveFormGroup.valid && this.team.teamPics.length > 0) {
      this.rest.editSaveTeam(this.team).subscribe((event) => {
        if (event.type == HttpEventType.Response && event.ok && event.body) {
              const dialog = this.matDialog.open(DialogComponent,
                {
                  width: '33%',
                  data: {
                    question: "Edited succesfully",
                    yesStr: "Ok",
                  },
                }
              );
              dialog.afterClosed().subscribe((event) => {
                if (event && event.data) {
                  window.location.reload();
                  this.getAllTeam();
                }
              });
        }
      });
    }
  }
}
