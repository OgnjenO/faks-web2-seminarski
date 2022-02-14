import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private cookie: CookieService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.cookie.check('token')) {
      console.log('No token');
      this.router.navigate(['login']);
      return false;
    }

    let isValidToken = !jwtHelper.isTokenExpired(this.cookie.get('token'));
    if(!isValidToken) {
      this.router.navigate(['login']);
    }
    return isValidToken;
  } 
}
