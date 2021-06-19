module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contacts', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    phone: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  },
    {timestamps: true});

  Contact.associate = (models) => {
    Contact.belongsTo(models.User);
  };

  return Contact;
};