'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'category', { type: Sequelize.ENUM('personal', 'business', 'production', 'marketing', 'finance') });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'category');
  }
};
