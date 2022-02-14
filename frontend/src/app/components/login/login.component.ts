import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email?: string;
  password?: string;

  constructor(private backendService: BackendService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.backendService.login(this.email, this.password).subscribe(response => {
      this.cookie.set('token', response.data);
      this.router.navigate(['/']);
    });
  }

}
