"use strict";

module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define(
    "comment",
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      image_url: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here

          models.comment.belongsTo(models.user, {
            foreignKey: {
              allowNull: false,
            },
          });
          models.comment.belongsTo(models.post, {
            foreignKey: {
              allowNull: false,
            },
          });
        },
      },
    }
  );
  return comment;
};
