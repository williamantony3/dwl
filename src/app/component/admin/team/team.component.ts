import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { team } from 'src/app/model/team.model';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  constructor(private rest:RestService){

  }

    formGroup = new FormGroup({
      teamName : new FormControl('',Validators.required),
      
    })
    team:team = {
      teamPics:"",
      dirPics:"",
      teamname:""
    }
    addTeam(){
      this.formGroup.markAllAsTouched()
      this.team.teamname = this.formGroup.get("teamName")?.value!
      console.log(this.team)
      if(this.formGroup.valid && this.team.teamPics.length > 0){
        this.rest.addTeam(this.team).subscribe(event => {
          console.log(event);
        })

      }

    }

    uploadFile(event: any) {
      const file: File = event.target.files[0];
      var fileReader = new FileReader();
      
      fileReader.onload = (e) => {
        let arrayBuffer = fileReader.result?.toString();
        console.log(arrayBuffer?.split(",")[1], event.target.files[0].name)
        this.team.teamPics = arrayBuffer?.split(",")[1]!;
        this.team.dirPics = event.target.files[0].name;
      };
      fileReader.onerror = (e) => {
        console.log(e)
      
      };
      fileReader.readAsDataURL(file);
    }
}
