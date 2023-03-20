import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) { }

  public setToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public logout() {
    sessionStorage.clear();
    this.router.navigate(["login"])
  }
  public isloggin() {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }
  public getUsername() {
    return this.jwtHelper.decodeToken(this.getToken()!);
  }
  public getUserId() {
    return this.jwtHelper.decodeToken(this.getToken()!)?.userId;
  }
}

export const TOKEN_KEY = "accessToken";