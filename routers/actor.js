

const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },


    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                });

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },



    //LABS

    //2
    deleteActorMovies: function(req,res){
        let actorId = req.params.id;
        Movie.deleteMany({
            actorId: {
                '$in': actors
            }
        },function (err,result){
            if(!err) return res.json(result);
            else res.json(err);
        });
    },

    //3
    deleteMovieInActor: function(req,res){
        let actorID = req.params.aId;
        let movieID = req.params.mId;

        Actor.findOne({ _id: actorID}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            
            if (actor.movies.length != 0){ //movies in actor is an array
                let status = false; //for checking whether the movie is present in the actor movies
                for (let i = 0; i < actor.movies.length; i++){
                    if (movieID == actor.movies[i]){
                        actor.movies.splice(i,1);
                        status = true;
                        break;
                    }
                }
                if (status){
                    Actor.updateOne({'_id': actorID}, { $set: { 'movies' : actor.movies } }, function (err,result){ //set manually the actual movies array in the actor database
                        if (!err) res.json(actor);
                        else res.json(err);
                    });
                }
                else{
                    res.send("Cannot remove the movie!");
                }
            }
            else {
                res.send("Sorry, Actor has no movies!");
            }
        });
    },

    //7 blom
    getAll2: function(req,res){
        Actor.find({}).populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors.title);
            }
        });
    }
};