//Models
const Sequelize = require('sequelize');
const database = require('../db');

const user = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('client', 'admin'),
        allowNull: false
    }
});

module.exports = user;
