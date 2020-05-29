// This is the table that is used to search for movies. Its seperate from the club just incase the user
// Made a mistake and doesn't want to schedule this movie.
module.exports = function (sequelize, DataTypes) {
    var Search = sequelize.define("Search", {
        title: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.STRING
        },
        poster: {
            type: DataTypes.STRING,
        },
        plot: {
            type: DataTypes.TEXT,
        }
    });
    return Search;
}