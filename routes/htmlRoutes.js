var db = require("../models");
module.exports = function(app) {
    // Each of the below routes just handles the HTML page that the user gets sent to.
    // index route loads view.html

    app.get("/", function(req, res) {
        db.MovieClubs.findAll({})
        .then(function (results){
            hbsObject = {
                clubs: results
            }
        }).then(res.render("index"));
    });

    // Displays every movieclub that is currently active on the events page
    app.get("/events", function(req, res){
        db.MovieClubs.findAll({})
        .then(function (results){
            hbsObject = {
                clubs: results
            }
        }).then(function() {
        res.render("events", hbsObject)
    });
    });
    // Displays the most current movie that is being looked up to add a club
    app.get("/add", function(req, res) {
        db.Search.findAll({
            limit: 1,
            order: [ ['createdAt', 'DESC'] ]
        }).then(function(results){ 
            hbsObject = {
            title: results[0].dataValues.title,
            date: results[0].dataValues.date,
            poster: results[0].dataValues.poster,
            plot: results[0].dataValues.plot
        }
        res.render("add", hbsObject)})
    });
    // Allows a user to RSVP to an event and put their name in that clubs database for guests.
    app.get("/rsvp/:id", function (req,res) {
        db.MovieClubs.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (results) {
            console.log(results);
            hbsObject = {
            id: results[0].dataValues.id,
            title: results[0].dataValues.movieTitle,
            date: results[0].dataValues.date,
            poster: results[0].dataValues.poster,
            plot: results[0].dataValues.plot
            }
        }).then( function() {
            res.render("rsvp", hbsObject)
        });
    })
}
