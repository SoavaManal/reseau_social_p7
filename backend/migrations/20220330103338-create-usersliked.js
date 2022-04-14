"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userslikeds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      likes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userslikeds");
  },
};
