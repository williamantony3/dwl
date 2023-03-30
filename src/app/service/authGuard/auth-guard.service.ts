import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authS: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const userPath = ['user'];
    const adminPath = ['admin'];

    if (route.routeConfig?.path == "login" &&this.authS.isloggin() ){
      if(this.authS.getUserRole() == 'USER'){
        this.router.navigate(["user/home"])
      }else{
        this.router.navigate(["admin/home"])
      }
    }
    else if (route.routeConfig?.path != "login") {
      if (!this.authS.isloggin()) {
        this.authS.logout();
        return false;
      }

    }
    
    if(this.authS.getUserRole() == 'USER'){
      return userPath.find(f => f.search(route.routeConfig?.path?.toString()!) >=0) ? true : false;
    }else{
      return adminPath.find(f => f.search(route.routeConfig?.path?.toString()!) >=0) ? true : false;
    }

    return true;
  }
}
