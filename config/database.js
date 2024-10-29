const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('news-api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
