module.exports = (sequelize, DataTypes) => {
  return sequelize.define('profiles', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    myanimelist: {
      type: DataTypes.STRING,
      defaultValue: 'https://myanimelist.net/',
    },
    protagonist: {
      type: DataTypes.STRING,
      defaultValue: '``Not set``',
    },
    waifu: {
      type: DataTypes.STRING,
      defaultValue: '``Not set``',
    },
    voiceActor: {
      type: DataTypes.STRING,
      defaultValue: '``Not set``',
    },
    anime: {
      type: DataTypes.STRING,
      defaultValue: '``Not set``',
    },
  });
};
