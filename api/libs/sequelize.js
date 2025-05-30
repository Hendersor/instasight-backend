const { Sequelize } = require("sequelize");
const { config } = require("../config/config.js");
const { setupModels } = require("../db/models/index.js");

const URI = config.db

const sequelize = new Sequelize(URI, 
    {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
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
