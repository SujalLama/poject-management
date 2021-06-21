'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'profile_path', { type: Sequelize.STRING });
    await queryInterface.addColumn('users', 'profile_file', { type: Sequelize.JSON });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'profile_path');
    await queryInterface.removeColumn('users', 'profile_file');
  }
};
