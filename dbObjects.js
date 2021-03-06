
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Gold = sequelize.import('models/Gold');
const Tags = sequelize.import('models/Tags');
const Profiles = sequelize.import('models/Profiles');

module.exports = { Gold, Tags, Profiles};
