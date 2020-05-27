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
            allowNull: false
        },
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    MovieClubs.associate = function(models){
        MovieClubs.hasMany(models.Guests, {
            onDelete: "cascade"
        });
    };
    return MovieClubs;
}