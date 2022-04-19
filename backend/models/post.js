"use strict";

module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define(
    "post",
    {
      content: DataTypes.STRING,
      image_url: DataTypes.STRING,
      likes: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here

          models.post.hasMany(models.comment, {
            onDelete: "cascade",
            hooks: true,
          });
          models.post.hasMany(models.usersliked, {
            onDelete: "cascade",
            hooks: true,
          });
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
