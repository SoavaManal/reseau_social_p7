"use strict";

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          models.user.hasMany(models.post, {
            onDelete: "cascade",
          });
          models.user.hasMany(models.comment, {
            onDelete: "cascade",
          });
          models.user.hasMany(models.usersliked, {
            onDelete: "cascade",
          });
        },
      },
    }
  );
  return user;
};
