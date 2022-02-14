import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  register(firstName: any, lastName: any, email: any, password: any): Observable<any> {
    return this.http.post<any>('http://localhost:5555/api/auth/register', { 'firstName': firstName, 'lastName': lastName, 'email': email, 'password': password });
  }

  login(email: any, password: any): Observable<any> {
    return this.http.post<any>('http://localhost:5555/api/auth/login', { 'email': email, 'password': password });
  }

  getMovies(): Observable<any> {
    return this.http.get<any>('http://localhost:5555/api/movies');
  }

  deleteMovie(movieId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('auth-token', this.cookie.get('token'));
    return this.http.delete<any>('http://localhost:5555/api/movies/' + movieId, {headers});
  }

  createMovie(title: any, year: any, stars: any, producers: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('auth-token', this.cookie.get('token'));
    return this.http.post<any>('http://localhost:5555/api/movies', { 'title': title, 'year': year, 'stars': stars, 'producent': producers }, {headers});
  }

  editMovie(movieId: any, title: any, year: any, stars: any, producers: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('auth-token', this.cookie.get('token'));
    return this.http.post<any>('http://localhost:5555/api/movies/' + movieId, { 'title': title, 'year': year, 'stars': stars, 'producent': producers }, {headers});
  }
}
