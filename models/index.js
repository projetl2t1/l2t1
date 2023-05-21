const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'postgresql-cohen.alwaysdata.net',
  port: 5432,
  database: 'cohen_l2t1',
  username: 'cohen',
  password: 'Descartes26',
  define : {
    timestamps : false,
    underscored: true
  },
  timezone:'Europe/Paris',
});
const db = {};
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports  = db;