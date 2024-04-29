const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig')

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('connected to db');
    })
    .catch(err => {
        console.log('Error:' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes, re-sync done!');
})

module.exports = db