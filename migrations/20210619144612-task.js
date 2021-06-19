'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('tasks', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      task_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      task_desc: Sequelize.TEXT,
      task_priority: Sequelize.ENUM('high', 'medium', 'low'),
      task_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      task_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      task_completed_at: Sequelize.DATE,
      task_deadline: Sequelize.DATE,
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        }
      },
    }, {
      timestamps: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('tasks');
  }
};
