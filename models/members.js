module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('members', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      projectId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
  },
    {timestamps: false});

  Member.associate = (models) => {
    Member.belongsTo(models.Project);
    Member.belongsTo(models.User);
    Member.belongsTo(models.Team);
  };

  return Member;
};