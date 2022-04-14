"use strict";

module.exports = (sequelize, DataTypes) => {
  var usersliked = sequelize.define(
    "usersliked",
    {
      likes: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here

          models.usersliked.belongsTo(models.user, {
            foreignKey: {
              allowNull: false,
            },
          });
          models.usersliked.belongsTo(models.post, {
            foreignKey: {
              allowNull: false,
            },
          });
        },
      },
    }
  );
  return usersliked;
};
