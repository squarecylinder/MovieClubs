// Contains MovieClubs and Guests
var db = require("../models");
module.exports = function(app) {
    // GET route for getting all of clubs
    app.get("/api/movieclubs/", function(req, res) {
        // grabbing the MovieClub table and finding all
      db.MovieClubs.findAll({}).then(function(dbClubs) {
        //   Then creating a json with the results
          res.json(dbClubs);
        });
    });
    // adding to clubs
    app.post("/api/movieclubs", function(req, res){
        // Creatings the MovieClubs table if it doesn't exist
        db.MovieClubs.create(req.body).then(function(dbClubs){
            res.json(dbClubs);
        });
    });
    // adding the search
    app.post("/api/add", function(req, res){
        db.Search.create(req.body).then(function(dbAdd){
            res.json(dbAdd);
        })
    });
    // Grabbing everything from the Search database
    app.get("/api/add", function(req, res) {
        db.Search.findAll({}).then(function(dbSearch){
            res.json(dbSearch);
        })
    })
    // Adding guests name to the Guests database
    app.post("/api/rsvp", function(req, res){
        db.Guests.create(req.body).then(function(dbGuests){
            res.json(dbGuests);
        });
    });
    // Should only show the specific movie the user is requesting to RSVP at
    app.get("/api/rsvp/:id", function(req, res) {
        db.MovieClubs.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(dbClubs){
            res.json(dbClubs)
        });
    });
    app.delete("/api/guest/:id", function(req, res) {
        db.Guests.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbGuests) {
            res.json(dbGuests)
        });
    });
}