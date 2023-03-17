import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { segment } from 'src/app/model/segment.model';
import { team } from 'src/app/model/team.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpC: HttpClient) { }
  host: string = environment.host;
  timeout = 600000;
  public login(username: string, password: string) {
    const url = this.host + "/auth/login"
    const request = new HttpRequest("POST", url, { username: username, password: password });
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  // segment
  public getListGameBySegmentId(segmentId: string){
    const url = this.host + "/segment/getGameBySegmentId/" + segmentId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public addSegment(segment:segment) {
    const url = this.host + "/segment/saveSegment"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, JSON.stringify(segment), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getAllSegment(){
    const url = this.host + "/segment/getAll";
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public editSaveSegment(segment:segment){
    const url = this.host + "/segment/editSegment";
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("PUT", url, JSON.stringify(segment), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public deleteSegmentById(segmentId: string){
    const url = this.host + "/segment/deleteSegmentById/" + segmentId;
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("GET", url, {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  // game
  public getGameByGameId(gameId: string){
    const url = this.host + "/game/getGameById/" + gameId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  // team
  public addTeam(team:team) {
    const url = this.host + "/team/save"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, JSON.stringify(team), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getAllTeam(){
    const url = this.host + "/team/getAll";
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public deleteTeamById(teamId: string){
    const url = this.host + "/team/deleteById/" + teamId;
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("GET", url, {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public editSaveTeam(team:team){
    const url = this.host + "/team/edit";
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("PUT", url, JSON.stringify(team), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
}
