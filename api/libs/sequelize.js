const { Sequelize } = require("sequelize");
const { config } = require("../config/config.js");
const { setupModels } = require("../db/models/index.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, 
    {
      dialect: "postgres",
      logging: URI === "development" ? console.log : false,
    });

setupModels(sequelize);  

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection done!");
  })
  .catch((err) => {
    console.error("Connection failed!", err);
  });

module.exports = { sequelize };
