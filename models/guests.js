// This table is just the guests name, it should tie many guests to one movie club
module.exports = function(sequelize, DataTypes) {
    var Guests = sequelize.define("Guests", {
        name: DataTypes.STRING
    });
    Guests.associate = function(models) {
        Guests.belongsTo(models.MovieClubs, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Guests
}