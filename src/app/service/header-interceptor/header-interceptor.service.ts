import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private authS:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(this.authS.getToken() == null)
    return next.handle(req)
    else {
      let request = req.clone({
        setHeaders : {Authorization: "Bearer "+ this.authS.getToken()! ,"Access-Control-Allow-Origin":"*"}
      })
      return next.handle(request)
    }
    
  }
}
