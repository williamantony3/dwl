import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public logout() {
    sessionStorage.clear()
  }
}

export const TOKEN_KEY = "accessToken";