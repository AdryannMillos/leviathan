'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Championships', {
      id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.TEXT
      },
      players: {
        type: Sequelize.TEXT
      },
      champion: {
        type: Sequelize.TEXT
      },
      top4: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Championships');
  }
};