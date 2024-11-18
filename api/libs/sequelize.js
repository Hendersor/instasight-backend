import { Sequelize } from "sequelize";
import { config } from "../config/config.js";
// import { setupModels } from "../models/index.js";

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(config.development.url, 
    {
      dialect: config.development.dialect,
      logging: process.env.NODE_ENV === "development" ? console.log : false,
    })

//setupModels(sequelize)  

sequelize.authenticate().then(() => {
    console.log("Connection done!");
  })
  .catch((err) => {
    console.log("Connection URI:", config.development.url);
    console.error("Connection failed!", err);
  });

export { sequelize };