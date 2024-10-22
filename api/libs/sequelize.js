const {Sequelize} = require("sequelize");
const {config} = require("../config/config.js");
const {setupModels, sequelize} = require("../models/index.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, 
    {
        dialect: "postgres",
        logging: process.env.NODE_ENV === "dev" ? console.log : false,
    })
setupModels(sequelize)


sequelize
  .authenticate()
  // This is the model function. And it's going to execute
  // right before the connection to create the models of the tables only if they are not already created.
  .then(() => {
    console.log("Connection done!");
  })
  .catch((err) => {
    console.error("Connection failed!", err);
  });

module.exports = { sequelize };