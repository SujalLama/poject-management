const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
  updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
  });
  //encrypting the password
  User.beforeCreate((user) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  })

  //association in user
  User.associate = (models) => {
    User.hasOne(models.Contact);
  };

  return User;
};