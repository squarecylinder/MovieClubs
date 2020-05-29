var db = require("../models");
module.exports = function(app) {
    // Each of the below routes just handles the HTML page that the user gets sent to.
    // index route loads view.html

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/events", function(req, res){
        db.MovieClubs.findAll({})
        .then(function (results){
            hbsObject = {
                clubs: results
            }
        });
        res.render("events", hbsObject);
    });
    
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
    
    app.get("/rsvp", function (req,res) {
        db.Guests.findAll({
        }).then(function (results) {
            hbsObject = {
                name: results
            }
        })
        res.render("rsvp", hbsObject);
    })
}
