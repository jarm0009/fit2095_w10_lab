const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "dist/week10")));

mongoose.connect('mongodb://localhost:27017/movies',{useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);


//LABS

//ACTOR
app.delete('/actors/:id', actors.deleteActorMovies); //2
app.delete('/actors/:aId/:mId', actors.deleteMovieInActor);//3
//app.get('/actors', actors.getAll2); //7

//MOVIE
app.delete('/movies/:id', movies.deleteOne); //1
app.delete('/movies/:mId/:aId', movies.deleteActorInMovie); //4
app.post('/movies/:mId/actors', movies.addActorToMovie); //5
app.get('/movies/:y1/:y2', movies.getBetweenYears); //6
//app.get('/movies', movies.getAll2); //8
app.post('/movies/deletebetweenyears', movies.deleteBetweenYears) //9




