import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private cookie: CookieService, private router: Router) {
  }

  title = 'frontend';
  isLoggedIn = false;

  ngOnInit(): void {
    if(this.cookie.check('token')) {
      let isValidToken = !jwtHelper.isTokenExpired(this.cookie.get('token'));
      if(isValidToken) {
        this.isLoggedIn = true;
      }
    }
  }

  logout() {
    this.cookie.delete('token');
    this.router.navigate(['/']);
  }
}
