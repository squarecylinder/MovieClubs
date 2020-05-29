// This is the movieclubs table, this will save all of the information for the movie club
module.exports = function(sequelize, DataTypes) {
    var MovieClubs = sequelize.define("MovieClubs", {
        eventTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 21
        },
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // This allows us to tie one movie club to many guests
    MovieClubs.associate = function(models){
        MovieClubs.hasMany(models.Guests, {
            onDelete: "cascade"
        });
    };
    return MovieClubs;
}