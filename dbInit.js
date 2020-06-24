const Sequelize = require('sequelize');

// Database Initialization
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

// Model importing
sequelize.import('models/Gold');
sequelize.import('models/Tags');
sequelize.import('models/Profiles');

// Model syncing
const force = process.argv.includes('--force') || process.argv.includes('-f');
sequelize.sync({ force });
