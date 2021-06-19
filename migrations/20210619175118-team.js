'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('teams', { 
       id: {
         type: Sequelize.INTEGER ,
          autoIncrement: true,
        allowNull: false,
        primaryKey: true
        },
        team_name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        team_desc: Sequelize.STRING,
        projectId: {
          type: Sequelize.INTEGER,
          unique: true,
          references: {
            model: 'projects',
            id: 'key'
          }
        }
      }, {
        timestamps: false
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
