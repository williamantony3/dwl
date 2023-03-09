import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
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
}
