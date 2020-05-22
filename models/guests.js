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