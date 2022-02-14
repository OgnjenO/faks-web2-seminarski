import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies?: any;

  displayedColumns: string[] = ['title', 'year', 'stars', 'producent', 'actions'];

  isFormOpened = false;
  isCreating = false;
  isEditing = false;

  targetMovieId: any;
  title: any;
  year: any;
  stars: any;
  producent: any;
  currentAction: String = '';

  constructor(private backendService: BackendService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.backendService.getMovies().subscribe(movies => {
      console.log(movies);
      this.movies = movies;
    });
  }

  editMovie(movie: any) {
    this.currentAction = 'Edit';
    this.targetMovieId = movie._id;
    this.title = movie.title;
    this.year = movie.year;
    this.stars = movie.stars;
    this.producent = movie.producent;
    this.isFormOpened = true;
    this.isCreating = false;
    this.isEditing = true;
  }

  deleteMovie(movie: any) {
    this.backendService.deleteMovie(movie._id).subscribe(response => {
      console.log(response);
      this.getMovies();
    });
  }

  createMovie() {
    this.currentAction = 'Create';
    this.targetMovieId = null;
    this.title = null;
    this.year = null;
    this.stars = null;
    this.producent = null;
    this.isFormOpened = true;
    this.isCreating = true;
    this.isEditing = false;
  }

  confirmAction() {
    if(this.isCreating) {
      this.backendService.createMovie(this.title, this.year, this.stars, this.producent).subscribe(response => {
        console.log(response);
        this.getMovies();
      });
    }
    else if(this.isEditing) {
      this.backendService.editMovie(this.targetMovieId, this.title, this.year, this.stars, this.producent).subscribe(response => {
        console.log(response);
        this.getMovies();
      });
    }
  }

  cancelAction() {
    this.isFormOpened = false;
  }
}
