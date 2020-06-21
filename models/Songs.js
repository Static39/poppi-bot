module.exports = (sequelize, DataTypes) => {
    return sequelize.define('songs', {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      tag1: DataTypes.TEXT,
      tag2: DataTypes.TEXT,
      tag3: DataTypes.TEXT,
    });
  };
  