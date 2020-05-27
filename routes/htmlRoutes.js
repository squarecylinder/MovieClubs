var db = require("../models");
module.exports = function(app) {
    // Each of the below routes just handles the HTML page that the user gets sent to.
    // index route loads view.html
    var currentDay = new Date();

    app.get("/", function(req, res) {
        
        res.render("index");
    });

    app.get("/events", function(req, res){
        hbsObject = {}
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
}