import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actortomovie',
  templateUrl: './actortomovie.component.html',
  styleUrls: ['./actortomovie.component.css']
})
export class ActortomovieComponent implements OnInit {
  //actor
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  //movie
  title: string = "";
  year: number = 0;
  movieId: string = "";

  actorsDB: any[] = [];
  moviesDB: any[] = [];

  selectedActor = null;
  selectedMovie = null;


  constructor(private dbService: DatabaseService, private router: Router) {}


  onGetMovies() {
    console.log("From on GetMovies");

    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }


  //Get all Actors
  onGetActors() {
    console.log("From on GetActors");

    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }





  // Update an Actor
  onSelectActor(item) {
    this.selectedActor= item
  }

  onSelectMovie(item) {
    this.selectedMovie = item
  }


  onAddActorToMovie() {
    let actorID = { id: this.selectedActor._id };
    this.dbService.actorToMovie(this.selectedMovie._id, actorID).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();
    }); 
  }

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
}
