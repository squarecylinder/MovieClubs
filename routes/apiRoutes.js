// Contains MovieClubs and Guests
var db = require("../models");
module.exports = function(app) {
    // GET route for getting all of clubs
    app.get("/api/movieclubs/", function(req, res) {
      db.MovieClubs.findAll({}).then(function(dbClubs) {
          res.json(dbClubs);
        });
    });
    // adding to clubs
    app.post("/api/movieclubs", function(req, res){
        db.MovieClubs.create(req.body).then(function(dbClubs){
            res.json(dbClubs);
        });
    });
    app.post("/api/add", function(req, res){
        db.Search.create(req.body).then(function(dbAdd){
            res.json(dbAdd);
        })
    });
    app.get("/api/add", function(req, res) {
        db.Search.findAll({}).then(function(dbSearch){
            res.json(dbSearch);
        })
    })
}