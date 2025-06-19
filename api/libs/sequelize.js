const { Sequelize } = require("sequelize");
const { config } = require("../config/config.js");
const { setupModels } = require("../db/models/index.js");

const isProduction = config.env === 'production';
console.log(isProduction)

const databaseUrl = isProduction ? config.dbProd : config.dbDev;

console.log(databaseUrl)

const sequelizeOptions = {
  dialect: "postgres",
  logging: !isProduction, 
}

if(isProduction){
    sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}


const sequelize = new Sequelize(databaseUrl, sequelizeOptions);
setupModels(sequelize);  

module.exports = { sequelize };
