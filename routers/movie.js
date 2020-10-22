var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
const movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },


    //LABS
    //1
    deleteOne: function(req,res){
        Movie.findOneAndRemove({_id: req.params.id}, function(err){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        })
    },
    //4
    deleteActorInMovie: function(req,res){
        let actorID = req.params.aId;
        let movieID = req.params.mId;

        Movie.findOne({ _id: movieID}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            
            if (movie.actors.length != 0){
                let status = false;
                for (let i = 0; i < movie.actors.length; i++){
                    if (actorID == movie.actors[i]){
                        movie.actors.splice(i,1);
                        status = true;
                        break;
                    }
                }
                if (status){
                    Movie.updateOne({'_id': movieID}, { $set: { 'actors' : movie.actors } }, function (err,result){
                        if (!err) res.json(movie);
                        else res.json(err);
                    });
                }
                else{
                    res.send("Cannot remove the actor!");
                }
            }
            else {
                res.send("Sorry, Movie has no actors!");
            }
        });
    },

    addActorToMovie: function (req, res) {
        Movie.findOne({ _id: req.params.mId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                //NEW
                actor.movies.push(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                });

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    getBetweenYears: function(req,res) {
        let y1 = req.params.y1;
        let y2 = req.params.y2;
        Movie.where('year').gte(y2).lte(y1).exec(function (err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json("Movie not found");

            res.json(movie);
        });
    },

    getAll2: function(req,res){
        Movie.find({}).populate('actors').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    deleteBetweenYears: function(req,res){
        let y1 = req.body.y1;
        let y2 = req.body.y2;
        let query = { $and : [{year:{ $gte: y2}}, {year:{ $lte: y1}}]};
        Movie.deleteMany(query, function (err, movies){
            if(err){
                return res.json(err);
            } else{
                res.json(movies);
            }
        });
    }
};