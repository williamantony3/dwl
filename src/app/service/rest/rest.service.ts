import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { claim } from 'src/app/model/claim.model';
import { game } from 'src/app/model/game.model';
import { gameToSegment } from 'src/app/model/gameToSegment.model';
import { gameWinner } from 'src/app/model/gameWinner.model';
import { optionAdmin } from 'src/app/model/optionAdmin.model';
import { segment } from 'src/app/model/segment.model';
import { team } from 'src/app/model/team.model';
import { User } from 'src/app/model/User.model';
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
  public addGameIntoSegment(gameToSegment:gameToSegment) {
    const url = this.host + "/segment/addGameIntoSegment"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, JSON.stringify(gameToSegment), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  // game
  public getGameByGameId(gameId: string){
    const url = this.host + "/game/getGameById/" + gameId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public addGame(game:game) {
    const url = this.host + "/game/saveGame"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, JSON.stringify(game), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getAllGame(){
    const url = this.host + "/game/getAll?includePics=false";
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getGameById(gameId: string){
    const url = this.host + "/game/getGameById/" + gameId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getGameDetailByUserAndGameId(userId: string, gameId: string){
    const url = this.host + "/game/getGameDetailByUserAndGameId?userId=" + userId + "&gameId=" + gameId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  
  public addGameDetail(gameId: string, option: string, finalizeOption: number) {
    const url = this.host + "/game/addGameDetail"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, {gameId: gameId, option: option, finalizeOption: finalizeOption}, {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public deleteGameById(gameId: string){
    const url = this.host + "/game/deleteGameById/" + gameId;
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("GET", url, {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getHistoryGameUser(userId : string){
    const url = this.host + "/game/getHistoryGame/" + userId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public userClaimPointGame(claim:claim) {
    const url = this.host + "/game/userClaimPointGame"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, JSON.stringify(claim), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public updateGameWinner(gameWinner:gameWinner){
    const url = this.host + "/game/updateGameWinner";
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("PUT", url, JSON.stringify(gameWinner), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public setLockedStatusGame(gameId: string, locked: number){
    const url = this.host + "/game/lockedGame?locked=" + locked + "&gameId=" + gameId;
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("PUT", url, {headers: header});
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
    const url = this.host + "/team/getAll?includePics=true";
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
  // user
  public getAllUser(){
    const url = this.host + "/user/getAll";
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public addUser(user:User) {
    const url = this.host + "/user/add"
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("POST", url, JSON.stringify(user), {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public deleteUserById(userId: string){
    const url = this.host + "/user/deleteById/" + userId;
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest("GET", url, {headers: header});
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  // public addPointUser(user:User){
  //   const url = this.host + "/user/updateUser";
  //   const header = new HttpHeaders().append('Content-Type', 'application/json');
  //   const request = new HttpRequest("PUT", url, JSON.stringify(user), {headers: header});
  //   return this.httpC.request(request).pipe(timeout(this.timeout));
  // }
  public changeUserOption(optionAdmin: optionAdmin){
      const url = this.host + "/game/changeUserOption";
      const header = new HttpHeaders().append('Content-Type', 'application/json');
      const request = new HttpRequest("POST", url, JSON.stringify(optionAdmin), {headers: header});
      return this.httpC.request(request).pipe(timeout(this.timeout));
  }
  public getUserById(userId: string){
    const url = this.host + "/user/getById/" + userId;
    const request = new HttpRequest("GET", url);
    return this.httpC.request(request).pipe(timeout(this.timeout));
  }

}
