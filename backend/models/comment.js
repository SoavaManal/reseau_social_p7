"use strict";

module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define(
    "comment",
    {
      content: DataTypes.TEXT,
      image_url: DataTypes.STRING,
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
