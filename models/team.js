module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('teams', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
   team_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
   },
   team_desc: DataTypes.STRING,
    projectId: {
      type: DataTypes.INTEGER,
      unique: true,
    }
  },
    {timestamps: false});

  Team.associate = (models) => {
    Team.belongsTo(models.Project);
    Team.belongsToMany(models.User, {through: 'members'});
  };

  return Team;
};