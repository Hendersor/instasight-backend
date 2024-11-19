import { Sequelize } from "sequelize";
import { config } from "../config/config.js";
import { setupModels } from "../models/index.js";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, 
    {
      dialect: "postgres",
      logging: URI === "development" ? console.log : false,
    })

setupModels(sequelize)  

sequelize.authenticate().then(async() => {
    console.log("Connection done!");

    try {
      await sequelize.sync();
      console.log("Tablas sincronizadas con éxito.");
    } catch (error) {
      console.error("Error al sincronizar las tablas:", error);
    }

  })



  .catch((err) => {
    console.error("Connection failed!", err);
  });

export { sequelize };