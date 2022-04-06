"use strict";

module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define(
    "post",
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      image_url: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here

          models.post.hasMany(models.comment);
          models.post.hasMany(models.usersliked);
          models.post.belongsTo(models.user, {
            foreignKey: {
              allowNull: false,
            },
          });
        },
      },
    }
  );
  return post;
};
