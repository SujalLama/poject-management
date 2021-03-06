module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('projects', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    project_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    project_desc: DataTypes.TEXT,
    category: {
      type: DataTypes.ENUM('personal', 'business', 'production', 'marketing', 'finance')
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {timestamps: true});

  Project.associate = (models) => {
    Project.belongsTo(models.User);
    Project.hasMany(models.Task);
    Project.hasOne(models.Team);
    Project.hasMany(models.Member)
  };

  return Project;
};