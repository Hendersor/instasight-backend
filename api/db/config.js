const { config } = require('../config/config.js'); 


module.exports = {
  "development": {
    "url": config.dbDev,
    "dialect": "postgres",
  },

  "production": {
    "url": config.dbProd,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};
