import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { segment } from 'src/app/model/segment.model';
import { team } from 'src/app/model/team.model';
import { teamResponse } from 'src/app/model/teamResponse.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent {
  listSegment: segment[] = [];
  showEditForm: boolean = false;

  constructor(
    private rest: RestService,
    private router: Router,
    private authS: AuthService,
    private matDialog: MatDialog
  ) {
    // this.formGroup.get('teamName')?.valueChanges.subscribe
    // (event => {console.log(event)});
    this.getAllSegment();
  }

  formGroup = new FormGroup({
    segmentName: new FormControl('', Validators.required),
  });

  deleteFormGroup = new FormGroup({
    segmentName: new FormControl('', Validators.required),
  });

  editFormGroup = new FormGroup({
    segmentName: new FormControl('', Validators.required),
  });

  editSaveFormGroup = new FormGroup({
    segmentName: new FormControl('', Validators.required),
  });

  segment: segment = {
    segmentName: '',
    picsName: '',
    base64: '',
  };

  addSegment() {
    this.formGroup.markAllAsTouched();
    this.segment.segmentName = this.formGroup.get('segmentName')?.value!;
    // console.log(this.team)
    if (this.formGroup.valid && this.segment.base64.length > 0) {
      this.rest.addSegment(this.segment).subscribe((event) => {
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
                  this.getAllSegment();
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
      this.segment.base64 = arrayBuffer?.split(',')[1]!;
      this.segment.picsName = event.target.files[0].name;
    };
    fileReader.onerror = (e) => {
      console.log(e);
    };
    fileReader.readAsDataURL(file);
  }

  getAllSegment() {
    this.rest.getAllSegment().subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.listSegment = Object(event.body)['data'];
      }
    });
  }

  deleteSegment() {
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
            .deleteSegmentById(this.deleteFormGroup.get('segmentName')?.value!)
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

  editSegment(){
    this.editFormGroup.markAllAsTouched();
    if (this.editFormGroup.valid) {
      this.showEditForm = true;
    }
  }

  cancelEditSegment(){
    this.showEditForm = false;
  }

  editSaveSegment(){
    this.editSaveFormGroup.markAllAsTouched();
    this.segment.segmentName = this.editSaveFormGroup.get('segmentName')?.value!;
    this.segment.segmentId = this.editFormGroup.get('segmentName')?.value!;
    // console.log(this.team)
    if (this.editSaveFormGroup.valid && this.segment.base64.length > 0) {
      this.rest.editSaveSegment(this.segment).subscribe((event) => {
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
                  this.getAllSegment();
                }
              });
        }
      });
    }
  }
}
