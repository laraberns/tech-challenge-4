const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

sequelize.authenticate().then(() => console.log('connected to db')).catch(err => console.log('Error:' + err));

const db = {
  Sequelize,
  sequelize,
  users: require('./user')(sequelize, DataTypes),
  quadras: require('./quadra')(sequelize, DataTypes),
  reservas: require('./reserva')(sequelize, DataTypes)
};

db.sequelize.sync({force: false}).then(() => console.log('yes, re-sync done!'));

module.exports = db;
