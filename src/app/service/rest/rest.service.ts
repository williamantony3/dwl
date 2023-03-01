import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
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
}
