module.exports = function (sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plot: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    return Events;
}