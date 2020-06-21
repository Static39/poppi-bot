module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tags', {
    name: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
