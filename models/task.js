module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('tasks', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      }, 
      task_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      task_desc: DataTypes.TEXT,
      task_priority: DataTypes.ENUM('high', 'medium', 'low'),
      task_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      task_created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      task_completed_at: DataTypes.DATE,
      task_deadline: DataTypes.DATE,
      projectId: {
        type: DataTypes.INTEGER,
      },
  },
    {timestamps: false});

  Task.associate = (models) => {
    Task.belongsTo(models.Project);
  };

  return Task;
};