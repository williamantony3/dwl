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


    console.log();

    if (route.routeConfig?.path == "login" &&this.authS.isloggin() ){
      this.router.navigate(["home"])
    }
    else if (route.routeConfig?.path != "login") {
      if (!this.authS.isloggin()) {
        this.authS.logout();
        return false;
      }

    }

    return true;
  }
}
