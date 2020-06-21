module.exports = (sequelize, DataTypes) => {
  return sequelize.define('gold', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
      gold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
      last_collect: {
        type: DataTypes.STRING,
        defaultValue: '00000',
        allowNull: false,
      },
  },
  {
    timestamps: false,
  });
};
