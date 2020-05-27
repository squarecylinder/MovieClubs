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