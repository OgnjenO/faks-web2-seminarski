import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;

  constructor(private backendService: BackendService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.backendService.register(this.firstName, this.lastName, this.email, this.password).subscribe(response => {
      this.cookie.set('token', response.data);
      this.router.navigate(['/']);
    });
  }

}
